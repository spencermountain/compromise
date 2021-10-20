import { indexN, doesOverlap } from './lib/_lib.js'
import getDifference from './lib/difference.js'
import getIntersection from './lib/intersection.js'
import getUnion from './lib/union.js'
import splitAll from './lib/split.js'
import pointerFromTerms from './pointerFromTerms.js'

// flat list of terms from nested document
const termList = function (docs) {
  let arr = []
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      arr.push(docs[i][t])
    }
  }
  return arr
}

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

export default {
  one: {
    termList,
    getDoc,
    getUnion,
    getIntersection,
    getDifference,
    indexN,
    doesOverlap,
    splitAll,
    pointerFromTerms,
  },
}
