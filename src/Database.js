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
                  }).catch((err) => {
                    reject(err)
                  })
                } else {
                  reject(new Error('User not created, invalid response', CreatedUser))
                }
              }).catch((err) => {
                reject(err)
              })
            } else {
              resolve(UserInfo[0])
            }
          }).catch((err) => {
            reject(err)
          })
        })
      },
      persistInboundMessage: (user, message) => {
        return new Promise((resolve, reject) => {
          this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`) VALUES (?, ?, ?, ?, ?, ?)', [
            'TEXTIN', user.tag, message.from, message.to, message.body, message.sid
          ]).then((result) => {
            this.query('UPDATE `users` SET `lastno` = ? WHERE `tag` = ?', [ message.to, user.tag ]).then((update) => {
              resolve(result.insertId)
            }).catch((err) => {
              reject(err)
            })
          }).catch((err) => {
            reject(err)
          })
        })
      },
      persistOutboundMessage: (user, message, sid, body, type) => {
        return new Promise((resolve, reject) => {
          type = (typeof type === 'string' && ([ 'BALANCE', 'HELP', 'DEPOSIT' ]).indexOf(type.toUpperCase()) > -1 ? type.toUpperCase() : null)
          this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`, `responsetype`) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            'TEXTOUT', user.tag, message.to, message.from, body, sid, type
          ]).then((result) => {
            resolve(result.insertId)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      updateMessagePrice: (priceinfo, xrp) => {
        return new Promise((resolve, reject) => {
          this.query('UPDATE `transactions` SET `amount` = ?, `valid` = 1 WHERE `transaction` = ?', [ xrp * -1, priceinfo.sid ]).then((result) => {
            this.query('SELECT `user` FROM `transactions` WHERE `transaction` = ?', [ priceinfo.sid ]).then((transaction) => {
              this.query('SELECT SUM(amount) as `balance` FROM `transactions` WHERE `valid` = 1 AND `user` = ?', [ transaction[0].user ]).then((result) => {
                this.query('UPDATE `users` SET `balance` = ? WHERE `tag` = ?', [ result[0].balance, transaction[0].user ]).then((result) => {
                  resolve(true)
                }).catch((err) => {
                  reject(err)
                })              
              }).catch((err) => {
                reject(err)
              })
            }).catch((err) => {
              reject(err)
            })  
          }).catch((err) => {
            reject(err)
          })
        })
      },
      processTransaction: (transaction) => {
        return new Promise((resolve, reject) => {
          this.query('SELECT * FROM `users` WHERE (`wallet` = ? AND `tag` = ?) OR (`wallet` = ? AND `tag` = ?)', [ 
            transaction.from, transaction.tag,
            transaction.to, transaction.tag
          ]).then((result) => {
            if (result.length > 0) {
              let user = result[0]
              this.query('INSERT INTO `transactions` (`type`, `user`, `from`, `to`, `message`, `transaction`, `amount`, `valid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                'DEPOSIT', user.tag, transaction.from, result[0].phone, null, transaction.hash, transaction.amount, 1
              ]).then((result) => {
                this.query('SELECT SUM(amount) as `balance` FROM `transactions` WHERE `valid` = 1 AND `user` = ?', [ user.tag ]).then((result) => {
                  let newBalance = result[0].balance
                  this.query('UPDATE `users` SET `balance` = ? WHERE `tag` = ?', [ newBalance, user.tag ]).then((result) => {
                    resolve({
                      user: user,
                      transaction: transaction,
                      balance: newBalance
                    })
                  }).catch((err) => {
                    reject(err)
                  })              
                }).catch((err) => {
                  reject(err)
                })
              }).catch((err) => {
                reject(err)
              })  
            } else {
              reject(new Error('Cannot find user for transaction (wallet + tag)'))
            }
          }).catch((err) => {
            reject(err)
          })
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