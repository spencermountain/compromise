const lookup = require('./_lookup')

// compare one term and one match
// const doesMatch = function(term, str) {
//   if (str === '') {
//     return false
//   }
//   return term.reduced === str || term.implicit === str || term.root === str || term.text.toLowerCase() === str
// }

const isObject = function (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

/** lookup an array of words or phrases */
exports.lookup = function (arr) {
  let values = []
  //is it a {key:val} object?
  let isObj = isObject(arr)
  if (isObj === true) {
    arr = Object.keys(arr).map(k => {
      values.push(arr[k])
      return k
    })
  }
  // support .lookup('foo')
  if (typeof arr === 'string') {
    arr = [arr]
  }

  //make sure we go fast.
  if (this._cache.set !== true) {
    this.cache()
  }

  let found = lookup(arr, values, this)
  let p = this.list[0]
  // make object response
  if (isObj === true) {
    let byVal = {}
    found.forEach(o => {
      byVal[o.value] = byVal[o.value] || []
      byVal[o.value].push(p.buildFrom(o.id, o.length))
    })
    Object.keys(byVal).forEach(k => {
      byVal[k] = this.buildFrom(byVal[k])
    })
    return byVal
  }
  // otherwise, make array response:
  found = found.map(o => p.buildFrom(o.id, o.length))
  return this.buildFrom(found)
}
exports.lookUp = exports.lookup
