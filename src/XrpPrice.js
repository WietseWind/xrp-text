'use strict'

const fetch = require('node-fetch')

class XrpPrice {
  constructor () {
    Object.assign(this, {
      price: {
        eur: 0,
        usd: 0
      },
      get: (Currency, Amount) => {
        return Math.floor(parseFloat(Amount) * this.price[Currency.toLowerCase().trim()] * 100) / 100
      },
      getXrp: (Currency, Amount) => {
        return Math.floor(parseFloat(Amount) / this.price[Currency.toLowerCase().trim()] * 1000000) / 1000000
      },
      fetchPrice: (Currency) => {
        return new Promise((resolve, reject) => {
          let Url = 'https://www.bitstamp.net/api/v2/ticker/xrp' + Currency.toLowerCase().trim() + '/'
          fetch(Url).then((r) => {
            return r.json()
          }).then((r) => {
            resolve(parseFloat(r.bid))
          }).catch((err) => {
            reject(err)
          })
        })
      }
    })

    const fetchPrices = () => {
      Object.keys(this.price).forEach((currency) => {
        this.fetchPrice(currency).then((price) => {
          console.log('-- Price', currency.toUpperCase(), '=', price)
          this.price[currency] = price
        })
      })
    }

    fetchPrices()

    setInterval(() => {
      fetchPrices()
    }, 30 * 1000)

    return this
  }
}

module.exports = XrpPrice