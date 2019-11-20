const tokenize = require('../../../01-tokenizer')

/** substitute-in new content */
exports.replaceWith = function(replace, keepTags) {
  if (!replace) {
    return this.delete()
  }
  // clear the cache
  this.uncache()
  this.list.forEach(p => {
    let newPhrases = tokenize.fromText(replace, this.world, this.pool())
    //tag the new phrases
    let tmpDoc = this.buildFrom(newPhrases)
    tmpDoc.tagger()

    // try to keep its old tags, if appropriate
    if (keepTags === true) {
      let oldTags = p.json({ terms: { tags: true } }).terms
      newPhrases[0].terms().forEach((t, i) => {
        if (oldTags[i]) {
          t.tagSafe(oldTags[i].tags, 'keptTag', this.world)
        }
      })
    }
    p.replace(newPhrases[0], this) //Oneday: support multi-sentence replacements
  })
  return this
}

/** search and replace match with new content */
exports.replace = function(match, replace, keepTags) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match)
  }
  this.match(match).replaceWith(replace, keepTags)
  return this
}
