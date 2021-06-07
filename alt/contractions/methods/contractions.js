const byApostrophe = /'/
const insertContraction = require('./_splice')
const french = require('./french')

// { after: 's', out: apostropheS }, //spencer's
// { after: 'd', out: apostropheD }, //i'd
// { after: 't', out: apostropheT }, //isn't

// // french contractions
// { before: 'l', out: preL }, // l'amour
// { before: 'd', out: preD }, // d'amerique

const reTag = function (terms, model, methods) {
  // lookup known words
  if (methods.checkLexicon) {
    methods.checkLexicon(terms, model)
  }
  // look at word ending
  if (methods.checkSuffix) {
    methods.checkSuffix(terms, model)
  }
  // try look-like rules
  if (methods.checkRegex) {
    methods.checkRegex(terms, model)
  }
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//really easy ones
const contractions = (document = [], model, methods) => {
  let list = model.contractions
  document.forEach((terms, n) => {
    // loop through terms backwards
    for (let i = terms.length - 1; i >= 0; i -= 1) {
      let before = null
      let after = null
      if (byApostrophe.test(terms[i].normal) === true) {
        let split = terms[i].normal.split(byApostrophe)
        before = split[0]
        after = split[1]
      }

      list.find(o => {
        let words = null
        // look for word-word match (cannot-> [can, not])
        if (o.word === terms[i].normal) {
          words = isArray(o.out) ? o.out : o.out(terms, i)
        }
        // look for after-match ('re -> [_, are])
        if (after !== null && after === o.after) {
          words = typeof o.out === 'string' ? [before, o.out] : o.out(terms, i)
        }
        // look for before-match (l' -> [le, _])
        if (before !== null && before === o.before) {
          words = typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
        }
        // spencer's
        if (after === 's') {
          words = methods.apostropheS(terms, i)
        }
        // ain't
        if (after === 't') {
          words = methods.apostropheT(terms, i)
        }
        // how'd
        if (after === 'd') {
          words = methods.apostropheD(terms, i)
        }
        // l'amour
        if (before === 'l') {
          words = french.preL(terms, i)
        }
        // d'amerique
        if (before === 'd') {
          words = french.preD(terms, i)
        }
        if (words) {
          insertContraction(document, [n, i], words, model)
          reTag(terms, model, methods)
          return true
        }
        return false
      })
    }
  })
}
module.exports = contractions
