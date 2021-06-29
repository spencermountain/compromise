const pointer = require('./pointer')

module.exports = {
  parseMatch: require('./parseMatch'),
  cacheDoc: require('./cacheDoc'),
  getDoc: pointer.getDoc,
  parsePointer: pointer.parsePointer,
}
