import { getDoc, parsePointer, createPointer } from './pointer.js'
import setTag from './tag/setTag.js'
import unTag from './tag/unTag.js'
import match from './match/index.js'
import parseMatch from './parseMatch/index.js'
import cacheDoc from './cache/cacheDoc.js'
import cacheMatch from './cache/cacheMatch.js'
import tokenize from './tokenize/index.js'
import termMethods from './termMethods.js'

export default {
  match,
  parseMatch,
  setTag,
  unTag,
  tokenize,
  cacheDoc,
  cacheMatch,
  getDoc,
  parsePointer,
  createPointer,
  termMethods,
}
