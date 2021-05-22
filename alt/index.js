const tokenize = require('./01-tokenize')
const data = require('./data')
const toView = require('./03-view')

const nlp = function (str) {
  let doc = tokenize(str, data)
  doc = toView(doc)
  return doc
}
module.exports = nlp
