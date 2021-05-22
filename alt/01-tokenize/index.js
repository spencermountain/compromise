const toSentences = require('./01-toSentence')
const toTerms = require('./02-toTerms')
const parseTerm = require('./03-toWords')
const addImplicit = require('./04-implicit')

const tokenize = function (txt, world) {
  // split into sentences
  let sentences = toSentences(txt, world)
  // split into word objects
  let doc = sentences.map(str => {
    let terms = toTerms(str)
    return terms.map(word => parseTerm(word))
  })
  // first-pass at contractions
  doc = addImplicit(doc, world)
  return doc
}
module.exports = tokenize
