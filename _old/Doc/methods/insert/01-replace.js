const tokenize = require('../../../01-tokenizer')

const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

/** substitute-in new content */
exports.replaceWith = function (replace, options = {}) {
  if (!replace) {
    return this.delete()
  }
  //support old-style params
  if (options === true) {
    options = { keepTags: true }
  }
  if (options === false) {
    options = { keepTags: false }
  }
  options = options || {}

  // clear the cache
  this.uncache()
  // return this
  this.list.forEach(p => {
    let input = replace
    // accept a function for replace
    if (typeof replace === 'function') {
      input = replace(p)
    }
    let newPhrases
    // accept a Doc object to replace
    if (input && typeof input === 'object' && input.isA === 'Doc') {
      newPhrases = input.list
      this.pool().merge(input.pool())
    } else if (typeof input === 'string') {
      //input is a string
      if (options.keepCase !== false && p.terms(0).isTitleCase()) {
        input = titleCase(input)
      }
      newPhrases = tokenize(input, this.world, this.pool())
      //tag the new phrases
      let tmpDoc = this.buildFrom(newPhrases)
      tmpDoc.tagger()
      newPhrases = tmpDoc.list
    } else {
      return //don't even bother
    }

    // try to keep its old tags, if appropriate
    if (options.keepTags === true) {
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
exports.replace = function (match, replace, options) {
  // if there's no 2nd param, use replaceWith
  if (replace === undefined) {
    return this.replaceWith(match, options)
  }
  this.match(match).replaceWith(replace, options)
  return this
}
