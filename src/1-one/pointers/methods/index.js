import { indexN } from '../api/lib/_lib.js'
import splitAll from '../api/lib/split.js'
import getDoc from './getDoc.js'

// flat list of terms from nested document
const termList = docs => docs.flat()

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
