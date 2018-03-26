'use strict'

const EventEmitter = require('events')
const RippleClient = require('rippled-ws-client')
const RippleSign = require('rippled-ws-client-sign')

class ConnectRippled extends EventEmitter {
  constructor (config) {
    let ledger

    super()

    return new Promise((resolve, reject) => {
      console.log('Connecting to rippled', config.ripple.server)
      new RippleClient(config.ripple.server).then((Connection) => {
        Object.assign(this, {
          withdraw: (toWallet, toDtag, amount) => {
            return new RippleSign({
              TransactionType: 'Payment',
              Account: config.ripple.account,
              Destination: toWallet,
              DestinationTag: toDtag,
              Amount: amount * 1000000, // Amount in drops, so multiply (6 decimal positions)
              LastLedgerSequence: ledger + 15
            }, config.ripple.keypair, Connection)
          }
        })

        Connection.on('error', (e) => {})
        Connection.on('reconnect', (r) => {})
        Connection.on('close', (c) => {})
        Connection.on('ledger', (l) => {
          // console.log(' ... Rippled ledger', l.ledger_index)
          ledger = l.ledger_index // for withdrawal
          this.emit('ledger', l)
        })
        Connection.on('transaction', (t) => {
          // console.log('## TRANSACTION', t)
          if (t.transaction.TransactionType === 'Payment') {
            // this.emit('transaction', t)
            let amount = parseInt(t.transaction.Amount)
            if (t.meta && typeof t.meta.delivered_amount !== 'undefined') {
              amount = t.meta.delivered_amount
            }
            if (t.meta && typeof t.meta.DeliveredAmount !== 'undefined') {
              amount = t.meta.DeliveredAmount
            }
            if (typeof t.transaction.DestinationTag !== 'undefined') {
              this.emit('transaction', {
                amount: amount / 1000 / 1000,
                from: t.transaction.Account,
                to: t.transaction.Destination,
                tag: t.transaction.DestinationTag,
                hash: t.transaction.hash
              })
            }
          }
        })
        Connection.on('state', (s) => {})
        Connection.on('retry', (r) => {})

        Connection.send({ command: 'server_info' }).then((ServerInfo) => {
          console.log('Connected to rippled', ServerInfo.info.pubkey_node, ServerInfo.info.build_version)
          resolve(this)
        }).catch((err) => {
          console.log('Server info error')
        })

        Connection.send({
          command: 'subscribe',
          accounts: [ config.ripple.account ]
        }).then((Response) => {
          // console.log('Subscribed', Response)
        }).catch((err) => {
          console.log('Subscribe error', err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = ConnectRippled