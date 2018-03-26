'use strict'

const EventEmitter = require('events')
const mysql = require('mysql')

class Database extends EventEmitter {
  constructor (config) {
    super()

    Object.assign(this, {
      query: (query, parameters) => {
        return new Promise((resolve, reject) => {
          const connection = mysql.createConnection({
            host: config.database.mysql.host,
            user: config.database.mysql.username,
            password: config.database.mysql.password,
            database: config.database.mysql.database
          })      
          connection.query(query, parameters, (error, results, fields) => {
            connection.end()
            if (error) {
              reject(error)
            } else {
              resolve(results)
            }        
          })
        })
      },
      insertConfirmedTransactions: (origin, xrp, fromUser, toUser) => {
        let query = 'INSERT INTO `transactions` SET `user` = ?, `type` = ?, `amount` = ?, `valid` = 1, `origin` = ?, `from` = ?, `to` = ?'
        return this.query(query, [ fromUser.tag, 'TRANSFER', xrp * -1, origin, fromUser.phone, toUser.phone ])
          .then(result => this.query(query, [ toUser.tag, 'TRANSFER', xrp, origin, fromUser.phone, toUser.phone ]))
      },
      insertConfirmedWithdrawal: (origin, xrp, fromUser, walletAndDtag) => {
        let query = 'INSERT INTO `transactions` SET `user` = ?, `type` = ?, `amount` = ?, `valid` = 1, `origin` = ?, `from` = ?, `to` = ?'
        return this.query(query, [ fromUser.tag, 'WITHDRAW', xrp * -1, origin, fromUser.phone, walletAndDtag ])
      },
      getTransaction: (txId) => {
        return this.query('SELECT * FROM `transactions` WHERE `id` = ?', [ txId ])
      },
      getUser: (phone) => {
        return new Promise((resolve, reject) => {
          let userQuery = 'SELECT `users`.*, ' +
            '(SELECT count(1) FROM `transactions` WHERE `phone` = ? AND `responsetype` = "HELP" AND `moment` > DATE_SUB(NOW(), INTERVAL 30 MINUTE)) as `helpcount`, ' +
            '(SELECT count(1) FROM `transactions` WHERE `phone` = ? AND `responsetype` = "BALANCE" AND `moment` > DATE_SUB(NOW(), INTERVAL 30 MINUTE)) as `balancecount`, ' +
            '(SELECT count(1) FROM `transactions` WHERE `phone` = ? AND `responsetype` = "DEPOSIT" AND `moment` > DATE_SUB(NOW(), INTERVAL 30 MINUTE)) as `depositcount` ' +
            'FROM `users` WHERE `phone` = ?'
          let userQueryBinding = [ phone, phone, phone, phone ]
          this.query(userQuery, userQueryBinding).then((UserInfo) => {
            if (UserInfo.length < 1) {
              // Create user
              this.query('INSERT INTO `users` (`phone`, `wallet`) VALUES (?, ?)', [ phone, config.ripple.account ]).then((CreatedUser) => {
                if (typeof CreatedUser.insertId !== 'undefined' && CreatedUser.insertId > 0) {
                  this.query(userQuery, userQueryBinding).then((UserInfo) => {
                    if (UserInfo.length < 1) {
                      reject(new Error('User create failed', CreatedUser))
                    } else {
                      resolve(UserInfo[0])
                    }
                  }).catch(err => reject(err))
                } else {
                  reject(new Error('User not created, invalid response', CreatedUser))
                }
              }).catch(err => reject(err))
            } else {
              resolve(UserInfo[0])
            }
          }).catch(err => reject(err))
        })
      },
      persistInboundMessage: (user, message) => {
        let txId
        return this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`) VALUES (?, ?, ?, ?, ?, ?)', [
          'TEXTIN', user.tag, message.from, message.to, message.body, message.sid
        ]).then((result) => {
          txId = result.insertId
          return this.query('UPDATE `users` SET `lastno` = ?, `country` = ? WHERE `tag` = ?', [ message.to, message.country, user.tag ])
        }).then(() => {
          return txId
        })
      },
      persistOutboundMessage: (user, message, sid, body, type) => {
        let twofactor = (typeof message.authCode === 'string' ? message.authCode : null)
        let origin = (typeof message.origin !== 'undefined' ? message.origin : null)
        type = (typeof type === 'string' && ([ 'HELP', 'BALANCE', 'DEPOSIT', 'WITHDRAWAL', 'TRANSFER' ]).indexOf(type.toUpperCase()) > -1 ? type.toUpperCase() : null)
        return this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`, `responsetype`, `twofactor`, `origin`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
          'TEXTOUT', user.tag, message.to, message.from, body, sid, type, twofactor, origin
        ])
      },
      findTxConfirmation: (tag, twofactor) => {
        return this.query('SELECT * FROM `transactions` WHERE `user` = ? AND `twofactor` = ? AND `valid` < 1 AND `moment` > DATE_SUB(NOW(), INTERVAL 1 HOUR) ORDER BY `id` DESC LIMIT 1', [ tag, twofactor ])
      },
      confirmTx: (id) => {
        return this.query('UPDATE `transactions` SET `valid` = 1 WHERE `id` = ?', [ id ])
      },
      setXrplTxHash: (tx, hash) => {
        return this.query('UPDATE `transactions` SET `transaction` = ? WHERE `id` = ?', [ hash, tx ])
      },
      updateUserBalance: (user) => {
        // ALWAYS charge `twofactor` records, since `valid` is used to invalidate the record when used, but if there's an 
        // amount, it's the Text charge - and the Text charge needs to be charged to the user.
        return this.query('SELECT SUM(amount) as `balance` FROM `transactions` WHERE (`valid` = 1 OR (`valid` = 0 AND `twofactor` IS NOT NULL)) AND `user` = ?', [ user ])
          .then(result => this.query('UPDATE `users` SET `balance` = ? WHERE `tag` = ?', [ result[0].balance, user ]))
          .then(result => this.query('SELECT * FROM `users` WHERE `tag` = ?', [ user ]))
      },
      updateMessagePrice: (priceinfo, xrp) => {
        let user
        let amount = xrp * -1
        if (isNaN(amount)) {
          amount = null
          console.log('-- Invalid price', priceinfo)
        }
        return this.query('UPDATE `transactions` SET `amount` = ?, `valid` = IF(`twofactor` IS NULL, 1, `valid`) WHERE `transaction` = ?', [ amount, priceinfo.sid ])
          .then(result => this.query('SELECT `user` FROM `transactions` WHERE `transaction` = ?', [ priceinfo.sid ]))
          .then((transaction) => {
            if (transaction.length > 0) {
              user = transaction[0].user
              return this.updateUserBalance(user)
            }
          })
      },
      processTransaction: (transaction) => {
        return new Promise((resolve, reject) => {
          this.query('SELECT * FROM `users` WHERE (`wallet` = ? AND `tag` = ?) OR (`wallet` = ? AND `tag` = ?)', [ 
            transaction.from, transaction.tag,
            transaction.to, transaction.tag
          ]).then((result) => {
            if (result.length > 0) {
              let newBalance
              let user = result[0]
              this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`, `amount`, `valid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                'DEPOSIT', user.tag, transaction.from, result[0].phone, null, transaction.hash, transaction.amount, 1
              ])
              .then(result => this.updateUserBalance(user.tag))
              .then(result => resolve({ user: result[0], transaction: transaction }))
              .catch(err => reject(err))
            } else {
              reject(new Error('Cannot find user for transaction (wallet + tag)'))
            }
          }).catch(err => reject(err))
        })
      }
    })
    
    return new Promise((resolve, reject) => {
      this.query('SELECT 1 + 1 AS solution').then((results) => {
        if (results[0].solution === 2) {
          resolve(this)
        } else {
          reject(new Error('MySQL response invalid'))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = Database