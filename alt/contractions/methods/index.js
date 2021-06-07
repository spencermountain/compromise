const hasContraction = /'/

// put n new words where 1 word was
const insertContraction = function (document, point, words, model) {
  let [n, w] = point
  words = words.map(word => {
    return {
      text: '',
      pre: '',
      post: '', //assumed
      normal: '',
      implicit: word,
      tags: new Set(),
    }
  })
  // move whitespace over
  words[0].pre = document[n][w].pre
  words[words.length - 1].post = document[n][w].post
  // add the text/normal to the first term
  words[0].text = document[n][w].text
  words[0].normal = document[n][w].normal // move tags too?
  // do the splice
  document[n].splice(w, 1, ...words)
}

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
            insertContraction(document, [n, i], o.out, methods)
            reTag(terms, model, methods)
            return
          }
          // look for after-match ('re -> [_, are])
          if (after === o.after && after !== null) {
            let out = typeof o.out === 'string' ? [before, o.out] : o.out(terms, i)
            insertContraction(document, [n, i], out, model)
            reTag(terms, model, methods)
            return
          }
          // look for before-match (l' -> [le, _])
          if (before === o.before && before !== null) {
            let out = typeof o.out === 'string' ? [o.out, after] : o.out(terms, i)
            insertContraction(document, [n, i], out, model)
            reTag(terms, model, methods)
            return
          }
        })
      }
    })
  },
}
