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
    res.Noun = noun
  }
  // 'greatest'
  let sup = fns.toSuperlative(w)
  if (sup) {
    res.Superlative = sup
  }
  // 'greater'
  let comp = fns.toComparative(w)
  if (comp) {
    res.Comparative = comp
  }
  // 'greatly'
  let adv = fns.toAdverb(w)
  if (adv) {
    res.Adverb = adv
  }
  // 'greaten' :/
  let vb = fns.toVerb(w)
  if (vb) {
    res.Verb = vb
  }
  // res.Adjective = w
  return res
}
module.exports = conjugate
