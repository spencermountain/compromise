import { getDoc, parsePointer, createPointer } from './pointer.js'
import setTag from './tag/setTag.js'
import unTag from './tag/unTag.js'
import match from './match/index.js'
import parseMatch from './parseMatch/index.js'
import cacheDoc from './cacheDoc.js'
import cacheMatch from './cacheMatch.js'

export default {
  match,
  parseMatch,
  cacheDoc,
  cacheMatch,
  getDoc,
  parsePointer,
  createPointer,
  setTag: setTag,
  unTag: unTag,
}
