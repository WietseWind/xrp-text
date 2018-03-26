'use strict'

const EventEmitter = require('events')
const express = require('express')
const fetch = require('node-fetch')
const twilio = require('twilio')
const bodyParser = require('body-parser')
const app = express()

class TwilioServer extends EventEmitter {
  constructor (config) {
    super()

    const twilioClient = new twilio(config.twilio.sid, config.twilio.token)

    const getTwilioMessagePrice = (MessageSid) => {
      return new Promise((resolve, reject) => {
        let Url = 'https://' + config.twilio.sid + ':' + config.twilio.token + '@api.twilio.com/2010-04-01/Accounts/' + config.twilio.sid + '/Messages/' + MessageSid + '.json'
        setTimeout(() => {
          fetch(Url).then((r) => {
            return r.json()
          }).then((r) => {
            resolve({
              price: parseFloat(r.price) * -1, 
              unit: r.price_unit,
              sid: MessageSid,
              from: r.direction === 'inbound' ? r.from : r.to
              // _all: r
            })
          }).catch(err => reject(err))
        }, 60 * 1000)
      })
    }

    Object.assign(this, {
      send: (from, to, message) => {
        return new Promise((resolve, reject) => {
          twilioClient.messages.create({
            to: to,
            from: from,
            body: message
          })
          .then((message) => {
            // console.log(message)
            resolve(message.sid)
            getTwilioMessagePrice(message.sid).then((p) => {
              this.emit('price', p)
            })  
          }).catch((err) => {
            reject(err)
          })
        })
      }
    })

    return new Promise((resolve, reject) => {
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.listen(process.env.PORT || config.http.port, () => {
        const router = express.Router()

        router.get('/', function(req, res) {
          // console.log(req)
          res.json({ message: 'Hooray! welcome to our API!' })
        })

        router.post('/', (req, res) => {
          this.emit('message', {
            from: req.body.From,
            to: req.body.To,
            body: req.body.Body,
            sid: req.body.MessageSid
          })
          // console.log(req.body.From, req.body.Body)

          getTwilioMessagePrice(req.body.MessageSid).then((p) => {
            this.emit('price', p)
          })

          res.writeHead(200, { 'Content-Type': 'text/xml' })
          res.end('')
        })
        
        app.use('/', router)
    
        resolve(this)  
      }).on('error', (err) => {
        reject(err)
      })
    })
  }
}

module.exports = TwilioServer
