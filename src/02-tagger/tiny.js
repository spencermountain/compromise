const lexiconStep = require('./01-init/01-lexicon')

//for the tokenize-only build, we want to keep
const smallTagger = function (doc) {
  let terms = doc.termList()
  lexiconStep(terms, doc.world)
  return doc
}
module.exports = smallTagger
