import { getDoc, parsePointer, createPointer } from './pointer.js'
import setTag from './tag/setTag.js'
import unTag from './tag/unTag.js'
import match from './match/index.js'
import parseMatch from './parseMatch/index.js'
import cacheDoc from './cache/cacheDoc.js'
import cacheMatch from './cache/cacheMatch.js'
import tokenize from './tokenize/index.js'
import termMethods from './termMethods.js'
import compute from './compute/index.js'

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
  utils: {
    // parsePointer,
    // createPointer,
    termList,
    getDoc,
    setTag,
    unTag,
    cacheDoc,
    cacheMatch,
    parseMatch,
    match,
  },
  tokenize,
  termMethods,
  compute,
}
