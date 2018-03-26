'use strict'

module.exports = (message) => {
  let parseMessage = `Sorry, your message could not be parsed.`

  let matches = message.trim().match(/^.*?[withdraw]{4,}.*?([0-9,.]+)[ \r\n\t]+([a-z]{3,})?[to \r\n\t]{0,}(r[a-zA-Z0-9]{20,})([ \r\t\n:]*[0-9]{1,})?/i)
  let parsed = {
    valid: false,
    wallet: null,
    tag: null,
    rawAmount: null,
    amount: null
  }

  if (matches) {
    parsed.rawAmount = matches[1]
    parsed.wallet = matches[3]
    parsed.tag = typeof matches[4] === 'undefined' ? 0 : parseInt(matches[4].replace(/[^0-9]/g, ''))

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
    if (isNaN(amount) || amount === 0) {
      parseMessage = `Invalid amount.`
      parsed.valid = false
    } else {
      parsed.valid = true
      parsed.amount = amount
      parseMessage = `OK`
    }
  }

  let response = {
    message: parseMessage,
    parsed: parsed
  }

  return response
}