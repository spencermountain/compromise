import getGrams from './getGrams.js'
import startGrams from './startGrams.js'
import endGrams from './endGrams.js'
import tokenize from './tokenize.js'
import sort from './sort.js'

const addMethod = function (View) {
  /** list all repeating sub-phrases, by word-count */
  View.prototype.ngrams = function (obj) {
    let list = tokenize(this)
    let arr = getGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }
  View.prototype.nGrams = View.prototype.ngrams
  View.prototype.ngram = View.prototype.ngrams

  /** n-grams with one word */
  View.prototype.unigrams = function (n) {
    let arr = getGrams(tokenize(this), { max: 1, min: 1 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }
  View.prototype.uniGrams = View.prototype.unigrams

  /** n-grams with two words */
  View.prototype.bigrams = function (n) {
    let arr = getGrams(tokenize(this), { max: 2, min: 2 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }
  View.prototype.biGrams = View.prototype.bigrams

  /** n-grams with three words */
  View.prototype.trigrams = function (n) {
    let arr = getGrams(tokenize(this), { max: 3, min: 3 })
    arr = sort(arr)
    if (typeof n === 'number') {
      arr = arr[n]
    }
    return arr
  }
  View.prototype.triGrams = View.prototype.trigrams

  /** list all repeating sub-phrases, using the first word */
  View.prototype.startgrams = function (obj) {
    let list = tokenize(this)
    let arr = startGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }
  View.prototype.startGrams = View.prototype.startgrams

  /** list all repeating sub-phrases, connected to the last word of each phrase */
  View.prototype.endgrams = function (obj) {
    let list = tokenize(this)
    let arr = endGrams(list, obj || {})
    arr = sort(arr)
    return arr
  }
  View.prototype.endGrams = View.prototype.endgrams

  /** list all repeating sub-phrases, connected to the last word of each phrase */
  View.prototype.edgegrams = function (obj) {
    let list = tokenize(this)
    let start = startGrams(list, obj || {})
    let end = endGrams(list, obj || {})
    // combine them together
    let all = start.concat(end)
    let combine = all.reduce((h, a) => {
      if (h[a.normal]) {
        h[a.normal].count += a.count
      } else {
        h[a.normal] = a
      }
      return h
    }, {})
    let arr = Object.keys(combine).map(k => combine[k])
    arr = sort(arr)
    return arr
  }
  View.prototype.edgeGrams = View.prototype.edgegrams
}
export default addMethod
