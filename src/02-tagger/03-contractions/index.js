const checkLexicon = require('../01-init/01-lexicon')
const tokenize = require('../../01-tokenizer')
const checkNegative = require('./01-negative')
const checkApostrophe = require('./02-simple')
const checkIrregulars = require('./03-irregulars')
const checkPossessive = require('./04-possessive')
const checkPerfect = require('./05-perfectTense')
const checkRange = require('./06-ranges')
const checkFrench = require('./07-french')
const isNumber = /^[0-9]+$/
const isOrdinal = /^[0-9]+(st|nd|rd|th)$/

const createPhrase = function (found, doc) {
  //create phrase from ['would', 'not']
  let phrase = tokenize(found.join(' '), doc.world, doc.pool())[0]
  //tag it
  let terms = phrase.terms()
  checkLexicon(terms, doc.world)
  //make these terms implicit
  terms.forEach(t => {
    t.implicit = t.text
    t.text = ''
    t.clean = ''
    // remove whitespace for implicit terms
    t.pre = ''
    t.post = ''
    // tag number-ranges
    if (isNumber.test(t.implicit)) {
      t.tag('Cardinal', 'num-range', doc.world)
    } else if (isOrdinal.test(t.implicit)) {
      t.tag('Ordinal', 'ord-range', doc.world)
    } else if (Object.keys(t.tags).length === 0) {
      t.tags.Noun = true // if no tag, give it a noun
    }
  })
  return phrase
}

const contractions = function (doc) {
  let world = doc.world
  doc.list.forEach(p => {
    let terms = p.terms()
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = checkNegative(term, p)
      found = found || checkApostrophe(term)
      found = found || checkIrregulars(term, p)
      found = found || checkPossessive(term, p, world)
      found = found || checkPerfect(term, p)
      found = found || checkRange(term, p)
      found = found || checkFrench(term, p)
      //add them in
      if (found !== null) {
        let newPhrase = createPhrase(found, doc)
        // keep tag NumberRange, if we had it
        if (p.has('#NumberRange') === true) {
          doc.buildFrom([newPhrase]).tag('NumberRange')
        }
        //set text as contraction
        let firstTerm = newPhrase.terms(0)
        firstTerm.text = term.text
        //grab sub-phrase to remove
        let match = p.buildFrom(term.id, 1, doc.pool())
        match.replace(newPhrase, doc, true)
      }
    }
  })
  return doc
}
module.exports = contractions
