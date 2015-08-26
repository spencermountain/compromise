'use strict'
exports.pluck = function(arr, str) {
  return arr.map(function(o) {
    return o[str]
  })
}

exports.flatten = function(arr) {
  let all = []
  arr.forEach(function(a) {
    all = all.concat(a)
  })
  return all
}

exports.compact = function(arr) {
  return arr.filter(function(a) {
    if (a === undefined || a === null) {
      return false
    }
    return true
  })
}
