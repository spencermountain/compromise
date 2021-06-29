const bySlash = /[\/:]/g

const parsePointer = function (pointer) {
  let [, /*skip*/ n, start, end] = pointer.split(bySlash)
  n = n === undefined ? null : parseInt(n, 10)
  start = start === undefined ? null : parseInt(start, 10)
  end = end === undefined || end === '-' ? null : parseInt(end, 10)
  if (isNaN(n) || isNaN(start) || isNaN(end)) {
    // eslint-disable-next-line
    console.warn(`invalid pointer: '${pointer}'`)
  }
  return { n, start, end }
}

// const createPointer = function (arr) {}

const getDoc = function (pointer, document) {
  let doc = []
  pointer
    .filter(str => str)
    .forEach(ptr => {
      let { n, start, end } = parsePointer(ptr)
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

module.exports = { getDoc, parsePointer }

// console.log(parsePointer('/0/0:1'))
