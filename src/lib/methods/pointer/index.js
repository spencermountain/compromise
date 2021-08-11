// const bySlash = /[/:]/g
/*
const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

const parsePointer = function (pointer) {
  if (isArray(pointer)) {
    return pointer
  }
  let [, n, start, end] = pointer.split(bySlash)
  n = n === undefined ? null : parseInt(n, 10)
  start = start === undefined ? null : parseInt(start, 10)
  end = end === undefined || end === '-' ? null : parseInt(end, 10)
  if (isNaN(n) || isNaN(start) || isNaN(end)) {
    // eslint-disable-next-line
    console.warn(`invalid pointer: '${pointer}'`)
  }
  return [n, start, end]
}*/

/*
const createPointer = function (arr) {
  let str = `/${arr[0]}`
  if (arr[1] || arr[1] === 0) {
    str += '/' + arr[1]
    if (arr[2] || arr[2] === 0) {
      str += ':' + arr[2]
    }
  }
  return str
}
*/

const getDoc = function (pointer, document) {
  let doc = []
  pointer
    .filter(str => str)
    .forEach(ptr => {
      let [n, start, end] = ptr //parsePointer(ptr)
      if (!start) {
        start = 0
      }
      let terms = document[n] || []
      if (!end) {
        end = terms.length
      }
      terms = terms.slice(start, end)
      if (terms.length > 0) {
        doc.push(terms)
      }
    })
  return doc
}

export { getDoc /*createPointer, parsePointer*/ }
