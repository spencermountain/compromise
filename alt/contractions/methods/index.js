const hasContraction = /'/
const insertContraction = require('./_splice')

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

module.exports = {
  //really easy ones
  simpleContractions: (document = [], model, methods) => {
    let list = model.contractions
    document.forEach((terms, n) => {
      // loop through terms backwards
      for (let i = terms.length - 1; i >= 0; i -= 1) {
        let before = null
        let after = null
        if (hasContraction.test(terms[i].normal) === true) {
          let split = terms[i].normal.split(hasContraction)
          before = split[0]
          after = split[1]
        }

        list.find(o => {
          // look for word-word match (cannot-> [can, not])
          if (o.word === terms[i].normal) {
            let out = isArray(o.out) ? o.out : o.out(terms, i)
            if (out) {
              insertContraction(document, [n, i], out, methods)
              reTag(terms, model, methods)
            }
            return
          }
          // look for after-match ('re -> [_, are])
          if (after === o.after && after !== null) {
            let out = typeof o.out === 'string' ? [before, o.out] : o.out(terms, i)
            if (out) {
              insertContraction(document, [n, i], out, model)
              reTag(terms, model, methods)
            }
            return
          }
          // look for before-match (l' -> [le, _])
          if (before === o.before && before !== null) {
            let out = typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
            if (out) {
              insertContraction(document, [n, i], out, model)
              reTag(terms, model, methods)
            }
            return
          }
        })
      }
    })
  },
}
