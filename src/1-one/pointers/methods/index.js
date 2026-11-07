import { indexN } from '../api/lib/_lib.js'
import splitAll from '../api/lib/split.js'
import getDoc from './getDoc.js'
import eachTerm from '../../tokenize/compute/_lib.js'

// flat list of terms from nested document
const termList = function (docs) {
  const arr = []
  eachTerm(docs, term => arr.push(term))
  return arr
}

export default {
  one: {
    termList,
    getDoc,
    pointer: {
      indexN,
      splitAll,
    }
  },
}
