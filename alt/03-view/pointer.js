const isNum = /^[0-9]+$/

// https://datatracker.ietf.org/doc/html/rfc6901
// '~' is encoded as '~0'
// '/' is encoded as '~1'
const escape = function (str) {
  str = str.replace(/~[^01]/g, '~0')
  str = str.replace(/\//g, '~1')
  return str
}

const unescape = function (str) {
  str = str.replace(/~0/g, '~')
  str = str.replace(/~1/g, '/')
  return str
}

const get = function (pointr, data) {
  // empty pointer is everything.
  if (!pointr) {
    return data
  }
  let parts = pointr.split('/')
  // gotta start with a slash
  if (parts[0] !== '') {
    return undefined
  }
  let node = data
  // walk through parts of the pointer
  for (let i = 1; i < parts.length; i += 1) {
    let el = unescape(parts[i])
    if (el === '-') {
      node = node[node.length - 1]
    } else if (isNum.test(el)) {
      el = parseInt(el, 10)
      node = node[el]
    } else if (data.hasOwnProperty(el)) {
      node = node[el]
    }
  }
  return node
}

const set = function (pathStr, data) {}

module.exports = {
  get,
  set,
}
