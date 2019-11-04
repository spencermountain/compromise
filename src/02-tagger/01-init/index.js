const steps = {
  lexicon: require('./01-lexicon'),
  punctuation: require('./02-punctuation'),
  regex: require('./03-regex'),
  suffix: require('./04-suffixes'),
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
    //mostly prefix checks
    steps.regex(term, world)
    //maybe we can guess
    steps.suffix(term, world)
  }
  return doc
}
module.exports = lookups
