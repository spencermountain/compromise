const pointer = require('./pointer')
const setTag = require('./tag/setTag')
const unTag = require('./tag/unTag')

module.exports = {
  match: require('./match'),
  parseMatch: require('./parseMatch'),
  cacheDoc: require('./cacheDoc'),
  cacheMatch: require('./cacheMatch'),
  getDoc: pointer.getDoc,
  parsePointer: pointer.parsePointer,
  createPointer: pointer.createPointer,
  setTag: setTag,
  unTag: unTag,
}
