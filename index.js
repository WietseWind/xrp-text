const _config = require('./src/LoadConfig')
const _database = _config.then((c) => { return new (require('./src/Database'))(c) })
const _rippled = _config.then((c) => { return new (require('./src/ConnectRippled'))(c) })
const _twilio = _config.then((c) => { return new (require('./src/TwilioServer'))(c) })

const price = new (require('./src/XrpPrice'))()

Promise.all([ _config, _rippled, _twilio, _database ]).then((values) => {
  const config = values[0]
  const rippled = values[1]
  const twilio = values[2]
  const database = values[3]

  process.stdout.write('\033c')
  console.log('-- Ready')

  /**
   * Watch for inbound text messages
   */
  twilio.on('message', (message) => {
    database.getUser(message.from).then((user) => {
      console.log('## Inbound [message] from [user]:', message, user)
      database.persistInboundMessage(user, message).then((dbInsert) => {
        message.origin = dbInsert
        console.log('  > Stored inbound message', message.sid, message.origin)
      })

      let body = `Please enter:\n\n"balance" or\n"deposit" or\n"send AMOUNT to PHONENUMBER" or\n"withdraw AMOUNT to WALLETADDRESS TAG"`
      let type = 'HELP'

      /**
       * BALANCE
       */
      if (message.body.toLowerCase().match(/b[a]*[l]*[a]*nc[e]*/)) {
        let balance = user.balance
        if (balance < 0) balance = 0
        let usd_balance = price.get('usd', balance).toFixed(2)
        let eur_balance = price.get('eur', balance).toFixed(2)
        body = `Your balance is:\n${balance} XRP`
        if (balance > 0) {
          body += `\n\nThis is ${usd_balance} USD / ${eur_balance} EUR.`
        }
        if (balance < 1) {
          body += `\n\nDeposit XRP to: \n${user.wallet}\n\nUse Destination Tag:\n${user.tag}\n\nDO NOT FORGET THE DESTINATION TAG!`
        }
        type = 'BALANCE'
      }

      /**
       * DEPOSIT
       */
      if (message.body.toLowerCase().match(/d[e]*p[o]*s[i]*[t]*/)) {
        body = `Deposit XRP to: \n${user.wallet}\n\nUse Destination Tag:\n${user.tag}\n\nDO NOT FORGET THE DESTINATION TAG!`
        type = 'DEPOSIT'
      }

      /**
       * WITHDRAW
       */
      if (message.body.toLowerCase().match(/w[i]*t[h]*[d]*raw/)) {
        // withdraw AMOUNT to WALLETADDRESS TAG
        body = `NOT IMPLEMENTED YET, ALMOST DONE!`
        type = null
      }

      /**
       * SEND
       */
      if (message.body.toLowerCase().trim().match(/^sen[dt]/)) {
        type = null
        let ParsedMessage = (require('./src/SendXrpParser'))(message, price)
        if (ParsedMessage.parsed.valid) {
          let usd_amount = ParsedMessage.parsed.amount.usd.toFixed(2)
          let eur_amount = ParsedMessage.parsed.amount.eur.toFixed(2)

          if (user.balance >= ParsedMessage.parsed.amount.xrp) {
            message.authCode = ((Math.random() * 100000000) + '').substring(0,7)
            body = `Please confirm sending:\n${ParsedMessage.parsed.amount.xrp} XRP (${usd_amount} USD / ${eur_amount} EUR) to \n${ParsedMessage.parsed.destination} (${ParsedMessage.parsed.country}) by replying (within 1 hour):\n\n${message.authCode}`
            body += `\n\nTo cancel, ignore this message.`
          } else {
            let balance = user.balance
            if (balance < 0) balance = 0    
            if (balance === 0) {
              type = 'DEPOSIT'
              body = `Sorry, you have no funds. \n\nDeposit XRP to:\n${user.wallet}\n\nUse Destination Tag:\n${user.tag}\n\nDO NOT FORGET THE DESTINATION TAG!`
            } else {
              type = 'BALANCE'
              body = `Sorry, your balance is insufficient.\n\nYour balance is currently ${balance} XRP.`
            }            
          }
        } else {
          body = ParsedMessage.message + `\n\nSyntax:\n\nsend AMOUNT to PHONENUMBER\n\nE.g.\nsend 1.2 usd to +31683164677`
        }
      }

      if (type === 'HELP' && message.body.toLowerCase().trim().match(/[0-9]{7}/) && !message.body.toLowerCase().trim().match(/[0-9]{8,}/)) {
        /**
         * CONFIRM
         */
        let confirmationCode = message.body.match(/([0-9]{7})/)[1]
        database.findTxConfirmation(user.tag, confirmationCode).then(records => {
          if (records.length > 0) {
            let txConfirm = records[0]
            // console.log('.txConfirm', txConfirm)
            let txRequest
            let parsedMessage
            database.getTransaction(txConfirm.origin).then((tx) => {
              txRequest = tx[0]
              // console.log('.txRequest', txRequest)
              ParsedMessage = (require('./src/SendXrpParser'))({
                body: txRequest.message,
                country: user.country
              }, price)
              if (ParsedMessage.parsed.valid) {
                console.log('>>>> OK, Confirm --', txConfirm, txRequest, ParsedMessage.parsed)
                /**
                 * 1. Check balance
                 * 2. Mark Valid
                 * 3. Get recipient user
                 * 4. Insert TRANSACTION
                 * 5. Recalculate user balance
                 * 6. Recalculate destination balance
                 * 7. Confirm to user
                 * 8. Confirm to recipient
                 */
                if (user.balance >= ParsedMessage.parsed.amount.xrp) {
                  let destinationUser
                  database.confirmTx(txConfirm.id)
                    .then(dbResult => database.getUser(ParsedMessage.parsed.destination))
                    .then((destination) => {
                      destinationUser = destination
                      console.log('> DEPOSIT DESTINATION', destination)
                      return database.insertConfirmedTransactions(message.origin, ParsedMessage.parsed.amount.xrp, user, destinationUser)
                    })
                    .then(dbResult => database.updateUserBalance(destinationUser.tag))
                    .then(dbResult => database.updateUserBalance(user.tag))
                    .then(() => {
                      console.log('DONE :) All fine. Transfer processed. Now inform the users...')

                      // Send message to sender
                      database.getUser(user.phone).then((u) => {
                        let usd_amount = price.get('usd', u.balance).toFixed(2)
                        let eur_amount = price.get('eur', u.balance).toFixed(2)
                        let body = `Transfer complete, ${ParsedMessage.parsed.amount.xrp} XRP sent to ${destinationUser.phone}\n\nYour balance is now:\n${u.balance} XRP (${usd_amount} USD / ${eur_amount} EUR)`
                        let textFrom = user.lastno === null ? message.to : u.lastno
                        let m = { to: message.to, from: u.phone, origin: txRequest.id }
                        twilio.send(textFrom, user.phone, body).then((sid) => database.persistOutboundMessage(u, m, sid, body))
                      })

                      // Send message to recipient
                      database.getUser(destinationUser.phone).then((u) => {
                        let usd_amount = price.get('usd', u.balance).toFixed(2)
                        let eur_amount = price.get('eur', u.balance).toFixed(2)
                        let body = `You have received ${ParsedMessage.parsed.amount.xrp} XRP from ${user.phone}\n\nYour balance is now:\n${u.balance} XRP (${usd_amount} USD / ${eur_amount} EUR)`
                        let textFrom = destinationUser.lastno === null ? message.to : u.lastno
                        let m = { to: message.to, from: u.phone, origin: txRequest.id }
                        twilio.send(textFrom, destinationUser.phone, body).then((sid) => database.persistOutboundMessage(u, m, sid, body))
                      })
                    })
                    .catch(err => console.log('!!!!!!! SHIT HITS THE FAN !!!!!!! TX CONFIRM ERROR', err))
                } else {
                  body = `Sorry, your balance is insufficient.\n\nYour balance is currently ${user.balance} XRP, while ${ParsedMessage.parsed.amount.xrp} XRP is required to process this transaction.`
                  twilio.send(txRequest.to, txRequest.from, body).then((sid) => database.persistOutboundMessage(user, message, sid, body))        
                }
              }
            })
          } else {
            console.log('.... TX NOK, CANNOT CONFIRM', confirmationCode, 'for user', user.tag)
            // No message to prevent reply costs on attack
          }
        }).catch(err => console.log('Error finding TxConfirmation transaction message.', err))
      } else {
        /**
         * Finalize 
         */
        let helpLimit = type === 'HELP' && user.helpcount > 0
        let balanceLimit = type === 'BALANCE' && user.balancecount > 0 && user.balance < 1
        let depositLimit = type === 'DEPOSIT' && user.depositcount > 0
        let onlyNumbers = message.body.trim().match(/^[0-9]+$/)
        if (helpLimit || balanceLimit || depositLimit || onlyNumbers) {
          // This type of message has been sent recently, skip sending a 
          // message to prevent balance draining
          console.log('Skip message [type] [user]', type, user)
        } else {
          console.log('Send to', message.to, body.replace(/\n/g, ' ').trim())
          twilio.send(message.to, message.from, body).then((sid) => {
            console.log('>> Outbound message', sid)
            database.persistOutboundMessage(user, message, sid, body, type)
          })
        }
      }
    }).catch((err) => {
      console.log('getUserInfoErr', err)
    })
  })

  /**
   * Watch for price updates (sent / received messages)
   */
  twilio.on('price', (priceinfo) => {
    // deduct from balance
    let charge = Math.floor(price.getXrp(priceinfo.unit, priceinfo.price) * config.billing.twilioFactor * 1000000) / 1000000
    database.updateMessagePrice(priceinfo, charge).then((result) => {
      console.log('<< Update price result', result)
    }).catch((err) => {
      console.log('!! Update price error', err)
    })
  })

  /**
   * Watch for transactions
   */
  rippled.on('transaction', (transaction) => {
    console.log('== XRP Ledger Transaction', transaction)
    database.processTransaction(transaction).then((result) => {
      console.log('Transaction processed', result)

      let usd_balance = price.get('usd', result.user.balance).toFixed(2)
      let eur_balance = price.get('eur', result.user.balance).toFixed(2)
      body = `Your deposit of ${transaction.amount} XRP is received!\n\nYour new balance is ${result.user.balance} XRP, this is ${usd_balance} USD / ${eur_balance} EUR.`
      
      let message = {
        from: typeof result.user.lastno === 'string' ? result.user.lastno : config.twilio.defaultno,
        to: result.user.phone
      }
      console.log('Send to', message.to, body.replace(/\n/g, ' ').trim())
      twilio.send(message.from, message.to, body).then((sid) => {
        console.log('>> Deposit confirmation', sid)
        database.persistOutboundMessage(result.user, message, sid, body)
      })
    }).catch((err) => {
      console.log('!! Transaction error', err.message)
    })
  })
}).catch((e) => {
  console.log(e)
})