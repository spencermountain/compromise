const makeHash = require('./hash')

const addMethods = function(Doc) {
  /** generate an md5 hash from the document */
  Doc.prototype.hash = function() {
    return makeHash(this)
  }

  /** compare two documents, by their hashes */
  Doc.prototype.isEqual = function(b) {
    return makeHash(this) === makeHash(b)
  }
}
module.exports = addMethods
