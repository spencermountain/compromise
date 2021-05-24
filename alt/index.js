const tokenize = require('./01-tokenize')
const model = require('./model')
const methods = require('./methods')
const toView = require('./03-view')

const nlp = function (str) {
  let doc = tokenize(str, model, methods)
  doc = toView(doc, model, methods)
  return doc
}
module.exports = nlp
