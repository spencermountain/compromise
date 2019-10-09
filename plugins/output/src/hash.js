const md5 = require('pure-md5').md5

const makeHash = function(doc) {
  let str = doc.text()
  return md5(str)
}
module.exports = makeHash
