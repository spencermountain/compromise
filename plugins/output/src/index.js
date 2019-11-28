const makeHash = require('./hash')
const toHtml = require('./html')

const addMethods = function(Doc) {
  /** generate an md5 hash from the document */
  Doc.prototype.hash = function() {
    return makeHash(this)
  }

  /** generate sanitized html from the document */
  Doc.prototype.html = function(segments = {}, options = {}) {
    return toHtml(this, segments, options)
  }
}
module.exports = addMethods
