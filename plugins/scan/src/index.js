const buildTrie = require('./build')
const scan = require('./scan')

const addMethod = function(Doc) {
  Doc.prototype.buildTrie = function(obj) {
    return buildTrie(obj)
  }

  Doc.prototype.scan = function(str, trie) {
    return scan(str, trie)
  }

  return Doc
}
module.exports = addMethod
