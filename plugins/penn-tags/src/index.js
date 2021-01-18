const addMethods = function (Doc) {
  Doc.prototype.pennTags = function (opts = {}) {
    let json = this.terms().json(opts)
    return json
  }
}
module.exports = addMethods
