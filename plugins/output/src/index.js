const md5 = require('pure-md5').md5
const addMethods = function(Doc) {
  /** generate an md5 hash from the document */
  Doc.prototype.hash = function() {
    let str = this.text()
    return md5(str)
  }

  /** generate sanitized html from the document */
  Doc.prototype.html = function(options = {}) {
    let str = this.text()
    return str
  }
}
module.exports = addMethods
