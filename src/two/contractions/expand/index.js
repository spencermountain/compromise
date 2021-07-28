import insertContraction from './_splice.js'
import apostropheD from './apostrophe-d.js'
import apostropheS from './apostrophe-s.js'
import apostropheT from './apostrophe-t.js'
import french from './french.js'
import numberRange from './number-range.js'

const byApostrophe = /'/
const numDash = /^[0-9].*?[-–—].*?[0-9]/i

const reTag = function (terms, model, methods) {
  let m = methods.preTagger || {}
  // lookup known words
  if (m.checkLexicon) {
    methods.preTagger.checkLexicon(terms, model)
  }
  terms.forEach(term => {
    // look at word ending
    if (m.checkSuffix) {
      m.checkSuffix(term, model)
    }
    // try look-like rules
    if (m.checkRegex) {
      m.checkRegex(term, model)
    }
  })
  m.fillTags(terms, model)
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//really easy ones
const contractions = (document = [], model, methods) => {
  let list = model.contractions || []
  const m = methods.contractions
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
      list.some(o => {
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
          words = apostropheS(terms, i)
        }
        // ain't
        if (after === 't') {
          words = apostropheT(terms, i)
        }
        // how'd
        if (after === 'd') {
          words = apostropheD(terms, i)
        }
        // l'amour
        if (before === 'l') {
          words = french.preL(terms, i)
        }
        // d'amerique
        if (before === 'd') {
          words = french.preD(terms, i)
        }
        // actually insert the new terms
        if (words) {
          insertContraction(document, [n, i], words, model)
          reTag(terms, model, methods)
          return true
        }
        // '44-2'
        if (numDash.test(terms[i].normal)) {
          words = numberRange(terms, i)
          if (words) {
            insertContraction(document, [n, i], words, model)
            reTag(terms, model, methods)
            return true
          }
        }
        return false
      })
    }
  })
}
export default contractions
