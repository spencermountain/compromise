const tokenize = require('../../../01-tokenizer')

const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

/** substitute-in new content */
exports.replaceWith = function(replace, keepTags, keepCase) {
  if (!replace) {
    return this.delete()
  }
  // clear the cache
  this.uncache()
  // return this
  this.list.forEach(p => {
    let str = replace
    // accept a function for replace
    if (typeof replace === 'function') {
      str = replace(p)
    }
    if (keepCase === true && p.terms(0).isTitleCase()) {
      str = titleCase(str)
    }
    let newPhrases = tokenize.fromText(str, this.world, this.pool())
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
exports.replace = function(match, replace, keepTags, keepCase) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match)
  }
  this.match(match).replaceWith(replace, keepTags, keepCase)
  return this
}
