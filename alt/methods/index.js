const pointer = require('./pointer')

module.exports = {
  parseMatch: require('./parseMatch'),
  cacheDoc: require('./cacheDoc'),
  cacheMatch: require('./cacheMatch'),
  getDoc: pointer.getDoc,
  parsePointer: pointer.parsePointer,
}
