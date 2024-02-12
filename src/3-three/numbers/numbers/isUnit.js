import parse from './parse/index.js'

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const toObject = function (input) {
  if (typeof input === 'string') {
    let tmp = {}
    tmp[input] = true
    input = tmp
  } else if (isArray(input)) {
    input = input.reduce((h, s) => {
      h[s] = true
      return h
    }, {})
  }
  return input
}

const isUnit = function (doc, input = {}) {
  input = toObject(input)
  return doc.filter(p => {
    let { unit } = parse(p)
    if (unit && input[unit] === true) {
      return true
    }
    return false
  })
}
export default isUnit
