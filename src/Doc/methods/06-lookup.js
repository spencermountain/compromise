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
      if (arr.every((a, n) => terms[i + n] && doesMatch(terms[i + n], a) === true)) {
        return terms[i].id
      }
    }
  }
  return false
}

//return a phrase-object from a ['word', 'sequence']
//this ought to be faster.
const findTerms = function(doc, termArr) {
  let found = []
  //go through each phrase
  doc.list.forEach(p => {
    // cache-miss, skip.
    if (p.cache.words[termArr[0]] !== true) {
      return
    }
    //we found a potential match
    let id = findStart(termArr, p.terms())
    if (id !== false) {
      // create the actual phrase object
      let phrase = p.buildFrom(id, termArr.length)
      found.push(phrase)
      return
    }
  })
  return found
}

const isObject = function(obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

// turn {key:val} into {val: Doc}
const lookupObject = function(doc, obj) {
  let result = {}
  Object.keys(obj).forEach(k => {
    let str = k.toLowerCase()
    let a = tokenize(str).map(s => s.trim())
    let found = findTerms(doc, a)
    if (found.length > 0) {
      result[obj[k]] = doc.buildFrom(found)
    }
  })
  return result
}

/** lookup an array of words or phrases */
exports.lookup = function(arr) {
  //make sure we go fast.
  this.cache()
  //is it a {key:val} object?
  if (isObject(arr)) {
    return lookupObject(this, arr)
  }
  // otherwise, do array mode.
  if (typeof arr === 'string') {
    arr = [arr]
  }
  let found = []
  arr.forEach(str => {
    str = str.toLowerCase()
    let a = tokenize(str)
    a = a.map(s => s.trim())
    found = found.concat(findTerms(this, a))
  })
  return this.buildFrom(found)
}
exports.lookUp = exports.lookup
