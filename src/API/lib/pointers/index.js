import getUnion from './union.js'
import getIntersection from './intersection.js'
import getDifference from './difference.js'
import { indexN, doesOverlap } from './_lib.js'

/** return a subset of the document, from a pointer */
const getDoc = function (pointer, document) {
  let doc = []
  pointer.forEach(ptr => {
    if (!ptr) {
      return
    }
    let [n, start, end] = ptr //parsePointer(ptr)
    let terms = document[n] || []
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = terms.length
    }
    terms = terms.slice(start, end)
    if (terms.length > 0) {
      doc.push(terms)
    }
  })
  return doc
}

export { getDoc, getUnion, getIntersection, getDifference, indexN, doesOverlap }
