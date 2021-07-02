const https = require('https')

const fetch = function (url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = ''
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
      .on('error', err => {
        console.error('Error: ' + err.message) // eslint-disable-line
        reject()
      })
  })
}

module.exports = fetch
