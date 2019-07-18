const steps = {
  lexicon: require('./01-lexicon'),
  punctuation: require('./02-punctuation'),
  emoji: require('./03-emoji'),
  suffix: require('./04-suffix'),
  web: require('./05-webText'),
}

//'lookups' look at a term by itself
const lookups = function(doc) {
  let terms = doc.termList()
  let world = doc.world
  //our list of known-words
  steps.lexicon(terms, world)

  //try these other methods
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    //or maybe some helpful punctuation
    steps.punctuation(terms, i, world)
    // ¯\_(ツ)_/¯
    steps.emoji(term, world)

    //don't overwrite existing tags
    if (Object.keys(term.tags).length > 0) {
      continue
    }
    //maybe we can guess
    steps.suffix(term, world)
  }
  return doc
}
module.exports = lookups
