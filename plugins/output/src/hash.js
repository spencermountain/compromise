const md5 = require('pure-md5').md5

const makeHash = function(doc) {
  let str = doc.text()
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      str += t.pre + (t.implicit || t.text) + t.post
      str += Object.keys(t.tags).join('')
    })
  })
  return md5(str)
}
module.exports = makeHash
