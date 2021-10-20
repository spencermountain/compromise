const steps = {
  lexicon: require('./01-lexicon'),
  punctuation: require('./02-punctuation'),
  regex: require('./03-prefixes'),
  suffix: require('./04-suffixes'),
  emoji: require('./05-emoji'),
}

//'lookups' look at a term by itself
const lookups = function (doc, terms) {
  let world = doc.world
  //our list of known-words
  steps.lexicon(terms, world)

  //try these other methods
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    //or maybe some helpful punctuation
    steps.punctuation(terms, i, world)
    //mostly prefix checks
    steps.regex(term, world)
    //maybe we can guess
    steps.suffix(term, world)
    //emoji and emoticons
    steps.emoji(term, world)
  }
  return doc
}
module.exports = lookups
