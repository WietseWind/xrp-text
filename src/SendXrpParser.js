'use strict'

const libPhoneNumber = require('google-libphonenumber')
const PhoneNumberUtil = libPhoneNumber.PhoneNumberUtil
const PhoneNumberFormat = libPhoneNumber.PhoneNumberFormat

module.exports = (message, price) => {
  let parseMessage = `Sorry, your message could not be parsed.`

  let matches = message.body.trim().toLowerCase().match(/^.*?[send]{3,}.*?([0-9,.]+)[ \r\n\t]+([a-z]{3,})?[to \r\n\t]{0,}([^a-z]+)[a-z]*?/i)
  let parsed = {
    valid: false,
    rawAmount: typeof matches[1] !== 'undefined' ? matches[1].trim() : null,
    currency: typeof matches[2] !== 'undefined' ? matches[2].toUpperCase().trim() : null,
    rawDestination: typeof matches[3] !== 'undefined' ? matches[3].trim() : null,
    country: message.country,
    amount: {},
    destination: null
  }

  if (matches) {
    try {
      const phoneno = '+' + parsed.rawDestination.replace(/[^0-9\-\(\)+]+/g, '').trim().replace(/\(0\)/, '').replace(/[\(\)]/g, '').replace(/^[0+]+/, '')
      const phoneUtil = PhoneNumberUtil.getInstance()
      const number = phoneUtil.parseAndKeepRawInput(phoneno)
      if (phoneUtil.isValidNumber(number)) {
        parsed.valid = true
        parsed.destination = phoneUtil.format(number, PhoneNumberFormat.E164)
      } else {
        const numberLocal = phoneUtil.parseAndKeepRawInput(parsed.rawDestination, message.country)
        if (phoneUtil.isValidNumber(numberLocal)) {
          parsed.valid = true
          parsed.destination = phoneUtil.format(numberLocal, PhoneNumberFormat.E164)
        } else {
          parseMessage = `Invalid destination phone number`
        }
      }
    } catch (e) {
      console.log('!! Phonenumber Parse Error:', parsed.rawDestination, '-', e.message)
      parseMessage = `Invalid destination phone number`
    }

    let UsWithThSep = parsed.rawAmount.match(/([0-9]*),([0-9]*)\.([0-9]*)/)
    let EuWithThSep = parsed.rawAmount.match(/([0-9]*)\.([0-9]*),([0-9]*)/)
    let amount
    if (UsWithThSep) {
      amount = parseFloat(parsed.rawAmount.replace(/,/g, ''))
    } else if (EuWithThSep) {
      amount = parseFloat(parsed.rawAmount.replace(/\./g, '').replace(/,/g, '.'))
    } else {
      amount = parseFloat(parsed.rawAmount.replace(/,/g, '.'))
    }
    if (isNaN(amount)) {
      parseMessage = `Invalid amount`
      parsed.valid = false
    }

    if (parsed.valid) {
      let currency = 'XRP'
      if (parsed.currency !== 'XRP' && parsed.currency !== null) {
        if (Object.keys(price.price).indexOf(parsed.currency.toLowerCase()) < 0) {
          parsed.valid = false
          let currencies = Object.keys(price.price).join(', ').toUpperCase()
          parseMessage = `Unknown currency: ${parsed.currency}. Supported currencies: XRP, ${currencies}.`
        } else {
          currency = parsed.currency
          amount = price.getXrp(parsed.currency, amount)
        }
      }
    }

    if (parsed.valid) {
      parsed.amount.xrp = amount
      Object.keys(price.price).forEach((c) => {
        parsed.amount[c.toLowerCase()] = price.get(c, amount)
      })

      parseMessage = `OK`
    }
  }

  let response = {
    message: parseMessage,
    parsed: parsed
  }

  return response
}