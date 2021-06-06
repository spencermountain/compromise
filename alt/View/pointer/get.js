const isNum = /^[0-9]+$/

// https://datatracker.ietf.org/doc/html/rfc6901
// '~' is encoded as '~0'
// '/' is encoded as '~1'
const unescape = function (str) {
  str = str.replace(/~1/g, '/')
  str = str.replace(/~0/g, '~')
  return str
}

// turn a pointer string into an array
const parsePointer = function (pointr) {
  let parts = pointr.split('/')
  // walk through parts of the pointer
  for (let i = 1; i < parts.length; i += 1) {
    parts[i] = unescape(parts[i])
    if (isNum.test(parts[i])) {
      parts[i] = parseInt(parts[i], 10)
    }
  }
  // allow trailing-slash
  if (parts.length > 1 && parts[parts.length - 1] === '') {
    parts.pop()
  }
  return parts
}

const get = function (pointr, data) {
  // empty pointer is everything.
  if (!pointr) {
    return data
  }
  let parts = pointr
  if (typeof pointr === 'string') {
    parts = parsePointer(pointr)
  }
  // gotta start with a slash
  if (parts[0] !== '') {
    return undefined
  }
  let one = parts[1]
  let two = parts[2]
  if (data[one]) {
    // fetch term by index
    if (typeof two === 'number') {
      return data[one][two]
    } else {
      // fetch by term name
      return data[one].find(t => t.normal === two)
    }
  }
  return undefined
}

module.exports = get
