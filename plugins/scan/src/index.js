const buildTrie = require('./build')
const scan = require('./scan')

const addMethod = function(Doc, world, nlp) {
  nlp.buildTrie = function(obj) {
    return buildTrie(obj)
  }

  Doc.prototype.scan = function(trie) {
    this.cache()

    return scan(this, trie)
  }

  return Doc
}
module.exports = addMethod
