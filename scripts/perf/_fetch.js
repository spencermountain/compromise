import https from 'https'

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

export default fetch
