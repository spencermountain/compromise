const buildTrie = require('./build')
const scan = require('./scan')

const addMethod = function(Doc, world, nlp) {
  /** turn an array or object into a compressed trie*/
  nlp.buildTrie = function(obj) {
    return buildTrie(obj)
  }

  /** find all matches in this document */
  Doc.prototype.scan = function(trie) {
    // cache it first
    if (!this._cache || this._cache.set !== true) {
      this.cache()
    }
    return scan(this, trie)
  }

  return Doc
}
module.exports = addMethod
