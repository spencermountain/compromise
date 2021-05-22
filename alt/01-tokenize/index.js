const toSentences = require('./01-toSentence')
const toTerms = require('./02-toTerms')
const parseTerm = require('./03-toWords')

const tokenize = function (txt, world) {
  let sentences = toSentences(txt, world)
  let doc = sentences.map(str => {
    let terms = toTerms(str)
    return terms.map(word => parseTerm(word))
  })
  return doc
}
module.exports = tokenize
