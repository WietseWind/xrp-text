'use strict'

const fs = require('fs')
const path = require('path')
const configPath = path.join(__dirname, '..', 'config.json')

module.exports = new Promise((resolve, reject) => {
  fs.exists(configPath, (configExists) => {
    if (configExists) {
      fs.readFile(configPath, 'utf8', (readConfigError, data) => {
        if (readConfigError) {
          reject(readConfigError)
        } else {
          try {
            let config = JSON.parse(data)
            console.log('Config loaded')
            resolve(config)
          } catch (jsonConfigError) {
            reject(jsonConfigError)
          }
        }
      },)
    } else {
      reject(new Error('Config (config.json) doesn\'t exist, copy the sample config (config.sample.json to config.json) and make changes'))
    }
  })
})