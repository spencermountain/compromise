'use strict';
const termList = require('./termList')

const sentenceList = (sentences, parent) => {
  let fn = () => {
    return sentences
  }

  let terms = sentences.reduce((arr, s) => {
    arr = arr.concat(s.split(' '))
    return arr
  }, [])
  fn.terms = termList(terms, parent)

  fn.first = () => {
    return sentences[0]
  }
  fn.last = () => {
    return sentences[sentences.length - 1]
  }
  fn.subset = () => {
    return sentenceList([1, 1, 1])
  }
  fn.find = () => {
    return fn
  }
  fn.reverse = () => {
    return fn
  }
  fn.unique = () => {
    return fn
  }
  fn.and = () => {
    return parent
  }
  return fn
}



module.exports = sentenceList
