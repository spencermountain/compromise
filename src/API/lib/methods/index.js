import { getDoc } from '../pointers/index.js'
import setTag from './tag/setTag.js'
import unTag from './tag/unTag.js'
// import match from '../../../01-one/match/methods/match/index.js'
// import parseMatch from '../../../01-one/match/methods/parseMatch/index.js'
import cacheDoc from './cache/cacheDoc.js'
import cacheMatch from './cache/cacheMatch.js'
// import compute from './compute/index.js'

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
    // parsePointer,
    // createPointer,
    termList,
    getDoc,
    setTag,
    unTag,
    cacheDoc,
    cacheMatch,
    // parseMatch,
    // match,
  },
}
