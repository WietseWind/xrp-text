process.stdout.write('\033c')

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

  console.log('-- Ready')

  /**
   * Watch for inbound text messages
   */
  twilio.on('message', (message) => {
    database.getUser('+31614345789').then((user) => {
      console.log('## Inbound [message] from [user]:', message, user)
      database.persistInboundMessage(user, message)

      let body = `Please enter:\n\n"balance" or\n"deposit" or\n"send AMOUNT to PHONENUMBER" or\n"withdraw AMOUNT to WALLETADDRESS TAG"`
      let type = 'HELP'

      /**
       * BALANCE
       */
      if (message.body.toLowerCase().match(/b[a]*[l]*[a]*nc[e]*/)) {
        let balance = user.balance
        if (balance < 0) balance = 0
        let usd_balance = price.get('usd', balance)
        let eur_balance = price.get('eur', balance)
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
      if (message.body.toLowerCase().match(/sen[dt]/)) {
        // transfer AMOUNT to PHONENUMBER
        body = `NOT IMPLEMENTED YET, ALMOST DONE!`
        type = null
      }

      /**
       * Finalize 
       */
      let helpLimit = type === 'HELP' && user.helpcount > 0
      let balanceLimit = type === 'BALANCE' && user.balancecount > 0 && user.balance < 1
      let depositLimit = type === 'DEPOSIT' && user.depositcount > 0
      if (helpLimit || balanceLimit || depositLimit) {
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

      let usd_balance = price.get('usd', result.balance)
      let eur_balance = price.get('eur', result.balance)
      let body = `Your deposit of ${transaction.amount} XRP is received!\n\nYour new balance is ${result.balance} XRP, this is ${usd_balance} USD / ${eur_balance} EUR.`
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