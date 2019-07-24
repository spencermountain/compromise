const build = require('../../01-tokenizer')

/** substitute-in new content */
exports.replace = function(match, replace) {
  let m = this.match(match)
  m.list.forEach(p => {
    let newPhrases = build.fromText(replace, this.pool())
    let tmpDoc = this.buildFrom(newPhrases)
    tmpDoc.tagger()
    p.replace(newPhrases[0], this)
  })
  return this
}

/** fully remove these terms from the document */
exports.delete = function(match) {
  this.unfreeze()
  let toRemove = this
  if (match) {
    toRemove = this.match(match)
  }
  toRemove.list.forEach(phrase => phrase.delete(this))
  return this
}

exports.insertAt = exports.insertAfter
