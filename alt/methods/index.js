import pointer from './pointer.js'
import setTag from './tag/setTag.js'
import unTag from './tag/unTag.js'
import match from './match/index.js'
import parseMatch from './parseMatch/index.js'
import cacheDoc from './cacheDoc.js'
import cacheMatch from './cacheMatch.js'

const getDoc = pointer.getDoc
const parsePointer = pointer.parsePointer
const createPointer = pointer.createPointer

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
