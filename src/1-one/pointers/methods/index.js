import { indexN, doesOverlap } from './lib/_lib.js'
import getDifference from './lib/difference.js'
import getIntersection from './lib/intersection.js'
import getUnion from './lib/union.js'
import splitAll from './lib/split.js'
import pointerFromTerms from './pointerFromTerms.js'
import getDoc from './getDoc.js'

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
