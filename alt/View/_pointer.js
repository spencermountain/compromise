const bySlash = /[\/>]/g

const getDoc = function (pointer, document) {
  let doc = []
  pointer
    .filter(str => str)
    .forEach(ptr => {
      let [, /*skip*/ n, start, end] = ptr.split(bySlash)
      if (!start) {
        start = 0
      }
      //support to-the-end-> syntax
      if (end === '-') {
        end = undefined
      }
      let terms = document[n] || []
      if (start) {
        // is the start invalid?
        start = Number(start)
        if (isNaN(start) === true) {
          return
        }
        if (end) {
          end = Number(end) || undefined
        }
        terms = terms.slice(start, end)
      }
      if (terms.length > 0) {
        doc.push(terms)
      }
    })
  return doc
}

const makePointer = function (arr) {}
module.exports = { getDoc }
