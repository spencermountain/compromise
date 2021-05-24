const toSentences = require('./01-toSentence')
const toTerms = require('./02-toTerms')
const parseTerm = require('./03-toWords')
const addImplicit = require('./04-implicit')

const tokenize = function (txt, model, methods) {
  // split into sentences
  let sentences = toSentences(txt, model)
  // split into word objects
  let doc = sentences.map(str => {
    let terms = toTerms(str)
    return terms.map(word => parseTerm(word, methods.normalize))
  })
  // first-pass at contractions
  doc = addImplicit(doc, model)
  return doc
}
module.exports = tokenize
