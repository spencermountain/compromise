const fastTagger = require('./fastTagger')

const matchRunner = function (Doc, world) {
  Doc.prototype.matchRunner = function (matches) {
    fastTagger(this, matches)
    return this
  }
}
module.exports = matchRunner
