const tokenize = require('./01-tokenize')
const data = require('./data')

const nlp = function (str) {
  let doc = tokenize(str, data)
  return doc
}
module.exports = nlp
