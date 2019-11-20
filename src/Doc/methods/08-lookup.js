const tokenize = require('../../01-tokenizer/02-words')

// do we have a match from this term?
const fromHere = function(terms, i, words) {
  for (let n = 0; n < words.length; n++) {
    if (terms[i + n].text !== words[n]) {
      return false
    }
  }
  return true
}

/** lookup an array of words or phrases */
exports.lookup = function(arr) {
  if (typeof arr === 'string') {
    arr = [arr]
  }
  let tokenized = arr.map(str => {
    str = str.toLowerCase()
    let words = tokenize(str)
    words = words.map(s => s.trim())
    return words
  })
  this.cache()
  let found = []
  this.list.forEach(p => {
    tokenized.forEach(a => {
      if (p.cache.words.hasOwnProperty(a[0])) {
        let terms = p.terms()
        let i = p.cache.words[a[0]]
        // try it, at this index
        if (fromHere(terms, i, a) === true) {
          let phrase = p.buildFrom(terms[i].id, a.length)
          found.push(phrase)
        }
      }
    })
  })
  return this.buildFrom(found)
}
