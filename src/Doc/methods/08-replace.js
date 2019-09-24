const tokenize = require('../../01-tokenizer')

/** substitute-in new content */
exports.replaceWith = function(replace) {
  if (!replace) {
    return this.delete()
  }
  this.list.forEach(p => {
    let newPhrases = tokenize.fromText(replace, this.world, this.pool())
    //tag the new phrases
    let tmpDoc = this.buildFrom(newPhrases)
    tmpDoc.tagger()
    p.replace(newPhrases[0], this) //TODO: support multi-sentence replacements
  })
  return this
}

/** search and replace match with new content */
exports.replace = function(match, replace) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match)
  }
  this.match(match).replaceWith(replace)
  return this
}

/** fully remove these terms from the document */
exports.delete = function(match) {
  let toRemove = this
  if (match) {
    toRemove = this.match(match)
  }
  toRemove.list.forEach(phrase => phrase.delete(this))
  return this
}
// aliases
exports.remove = exports.delete
