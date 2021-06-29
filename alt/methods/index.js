const pointer = require('./pointer')

module.exports = {
  match: require('./match'),
  parseMatch: require('./parseMatch'),
  cacheDoc: require('./cacheDoc'),
  cacheMatch: require('./cacheMatch'),
  getDoc: pointer.getDoc,
  parsePointer: pointer.parsePointer,
  createPointer: pointer.createPointer,
}
