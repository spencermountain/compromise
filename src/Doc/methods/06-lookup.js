const tokenize = require('../../01-tokenizer/02-words')

// compare one term and one match
const doesMatch = function(term, str) {
  if (str === '') {
    return false
  }
  return term.reduced === str || term.implicit === str || term.root === str || term.text.toLowerCase() === str
}

// is this lookup found in these terms?
const findStart = function(arr, terms) {
  //find the start
  for (let i = 0; i < terms.length; i++) {
    if (doesMatch(terms[i], arr[0])) {
      if (arr.every((a, n) => doesMatch(terms[i + n], a) === true)) {
        return terms[i].id
      }
    }
  }
  return false
}

/** lookup an array of words or phrases */
exports.lookup = function(arr) {
  if (typeof arr === 'string') {
    arr = [arr]
  }
  let lookups = arr.map(str => {
    str = str.toLowerCase()
    let words = tokenize(str)
    words = words.map(s => s.trim())
    return words
  })
  this.cache()
  let found = []
  // try each lookup
  lookups.forEach(a => {
    //try each phrase
    this.list.forEach(p => {
      // cache-miss, skip.
      if (p.cache.words[a[0]] !== true) {
        return
      }
      //we found a potential match
      let terms = p.terms()
      let id = findStart(a, terms)
      if (id !== false) {
        // create the actual phrase
        let phrase = p.buildFrom(id, a.length)
        found.push(phrase)
        return
      }
    })
  })
  return this.buildFrom(found)
}
exports.lookUp = exports.lookup
