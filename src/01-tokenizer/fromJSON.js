const Term = require('../Term/Term')
const Phrase = require('../Phrase/Phrase')
const Pool = require('./Pool')
const linkTerms = require('./_linkTerms')

const fromJSON = function(json, world) {
  let pool = new Pool()
  let phrases = json.map(p => {
    let terms = p.terms.map(o => {
      let term = new Term(o.text)
      term.pre = o.pre !== undefined ? o.pre : term.pre
      term.post = o.post !== undefined ? o.post : term.post
      if (o.tags) {
        o.tags.forEach(tag => term.tag(tag, '', world))
      }
      pool.add(term)
      return term
    })
    //add prev/next links
    linkTerms(terms)
    // return a proper Phrase object
    return new Phrase(terms[0].id, terms.length, pool)
  })
  return phrases
}
module.exports = fromJSON
