const Term = require('../Term/Term')
const Phrase = require('../Phrase/Phrase')
const Pool = require('./Pool')
const linkTerms = require('./_linkTerms')

const fromJSON = function (json, world) {
  let pool = new Pool()
  let phrases = json.map((p, k) => {
    let terms = p.terms.map((o, i) => {
      let term = new Term(o.text)
      term.pre = o.pre !== undefined ? o.pre : ''
      if (o.post === undefined) {
        o.post = ' '
        //no given space for very last term
        if (i >= p.terms.length - 1) {
          o.post = '. '
          if (k >= p.terms.length - 1) {
            o.post = '.'
          }
        }
      }
      term.post = o.post !== undefined ? o.post : ' '

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
