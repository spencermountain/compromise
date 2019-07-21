'use strict'
const fns = {
  toNoun: require('./toNoun'),
  toSuperlative: require('./toSuperlative'),
  toComparative: require('./toComparative'),
  toAdverb: require('./toAdverb'),
  toVerb: require('./toVerb'),
}

/** conjugate an adjective into other forms */
const conjugate = function(w) {
  let res = {}
  // 'greatness'
  let noun = fns.toNoun(w)
  if (noun) {
    res[noun] = 'Noun'
  }
  // 'greatest'
  let sup = fns.toSuperlative(w)
  if (sup) {
    res[sup] = 'Superlative'
  }
  // 'greater'
  let comp = fns.toComparative(w)
  if (comp) {
    res[comp] = 'Comparative'
  }
  // 'greatly'
  let adv = fns.toAdverb(w)
  if (adv) {
    res[adv] = 'Adverb'
  }
  // 'greaten' :/
  let vb = fns.toVerb(w)
  if (vb) {
    res[vb] = 'Verb'
  }
  return res
}
module.exports = conjugate
