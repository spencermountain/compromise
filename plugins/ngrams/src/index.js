const getGrams = require('./getGrams')
const startGrams = require('./startGrams')
const endGrams = require('./endGrams')
const tokenize = require('./tokenize')
const sort = require('./sort')

const addMethod = function(Doc) {
  /** list all repeating sub-phrases, by word-count */
  Doc.prototype.ngrams = function(obj) {
    let list = tokenize(this)
    let arr = getGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }

  /** n-grams with one word */
  Doc.prototype.unigrams = function(n) {
    let arr = getGrams(tokenize(this), { max: 1, min: 1 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }

  /** n-grams with two words */
  Doc.prototype.bigrams = function(n) {
    let arr = getGrams(tokenize(this), { max: 2, min: 2 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }
  /** n-grams with two words */
  Doc.prototype.trigrams = function(n) {
    let arr = getGrams(tokenize(this), { max: 3, min: 3 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }

  /** list all repeating sub-phrases, using the first word */
  Doc.prototype.startgrams = function(obj) {
    let list = tokenize(this)
    let arr = startGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }
  /** list all repeating sub-phrases, connected to the last word of each phrase */
  Doc.prototype.endgrams = function(obj) {
    let list = tokenize(this)
    let arr = endGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }
}
module.exports = addMethod
