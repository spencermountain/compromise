const checkNegative = require('./01-negative')
const checkApostrophe = require('./02-apostrophe-s')
const checkIrregulars = require('./03-irregulars')
const build = require('../../tokenizer')

const contractions = function(doc) {
  doc.list.forEach(p => {
    let terms = p.terms()
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = checkNegative(term)
      found = found || checkApostrophe(term)
      found = found || checkIrregulars(term)
      //add them in
      if (found !== null) {
        //create phrase from ['would', 'not']
        let newPhrase = build.fromText(found.join(' '), doc.pool())[0]
        //tag it
        let tmpDoc = doc.buildFrom([newPhrase])
        tmpDoc.tagger()
        // newPhrase.tagger()
        //grab sub-phrase to remove
        let match = p.buildFrom(term.id, 1, doc.pool())
        match.replace(newPhrase, doc)
      }
    }
  })
  return doc
}
module.exports = contractions
