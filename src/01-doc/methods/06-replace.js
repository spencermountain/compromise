const build = require('../../tokenizer')

/** substitute-in new content */
exports.replace = function(match, replace) {
  let old = this
  if (replace) {
    old = this.match(match)
  } else {
    replace = match
  }
  let newPhrases = build.fromText(replace, this.pool())
  // let doc = old.delete()

  // doc.append(newPhrases)
  // console.log(newPhrases)
  // let firstPhrase = build.fromText(replacement, this.pool())[0]

  // this.match(match).forEach(found => {
  //   let phrase = found.list[0]
  //   phrase.insertBefore(firstPhrase, this)
  // })

  // console.log(replacement)
  // found.debug()
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
