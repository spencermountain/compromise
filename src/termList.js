'use strict';

const termList = (arr, parent) => {
  let fn = () => {
    return arr
  }
  fn.first = () => {
    return arr[0]
  }
  fn.last = () => {
    return arr[arr.length - 1]
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



module.exports = termList
