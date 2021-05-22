const wordlike = /\S/
const isBoundary = /^[!?.]+$/
const naiiveSplit = /(\S+)/
const { hasHyphen, splitHyphens } = require('./01-hyphens')
const combineRanges = require('./03-ranges')
const combineSlashes = require('./02-slashes')

let notWord = ['.', '?', '!', ':', ';', '-', '–', '—', '--', '...', '(', ')', '[', ']', '"', "'", '`']
notWord = notWord.reduce((h, c) => {
  h[c] = true
  return h
}, {})

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//turn a string into an array of strings (naiive for now, lumped later)
const splitWords = function (str) {
  let result = []
  let arr = []
  //start with a naiive split
  str = str || ''
  if (typeof str === 'number') {
    str = String(str)
  }
  if (isArray(str)) {
    return str
  }

  const words = str.split(naiiveSplit)
  for (let i = 0; i < words.length; i++) {
    //split 'one-two'
    if (hasHyphen(words[i]) === true) {
      arr = arr.concat(splitHyphens(words[i]))
      continue
    }
    arr.push(words[i])
  }
  //greedy merge whitespace+arr to the right
  let carry = ''
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i]
    //if it's more than a whitespace
    if (wordlike.test(word) === true && notWord.hasOwnProperty(word) === false && isBoundary.test(word) === false) {
      //put whitespace on end of previous term, if possible
      if (result.length > 0) {
        result[result.length - 1] += carry
        result.push(word)
      } else {
        //otherwise, but whitespace before
        result.push(carry + word)
      }
      carry = ''
    } else {
      carry += word
    }
  }
  //handle last one
  if (carry) {
    if (result.length === 0) {
      result[0] = ''
    }
    result[result.length - 1] += carry //put it on the end
  }
  // combine 'one / two'
  result = combineSlashes(result)
  result = combineRanges(result)
  // remove empty results
  result = result.filter(s => s)
  return result
}
module.exports = splitWords
