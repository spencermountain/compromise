const toHtml = require('./html')

const addMethods = function(Doc) {
  /** generate sanitized html from the document */
  Doc.prototype.html = function(segments = {}, options = {}) {
    return toHtml(this, segments, options)
  }
}
module.exports = addMethods
