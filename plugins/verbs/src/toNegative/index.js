// #Modal : would walk    -> 'would not walk'
// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk

const toNegative = function(parsed, world) {
  // if it's already negative...
  if (parsed.negative.found) {
    return
  }

  // would walk -> would not walk
  if (parsed.auxiliary.found) {
    parsed.auxiliary.append('not')
    return
  }
  // is walking -> is not walking
  if (parsed.verb.has('#Copula')) {
    parsed.verb.append('not')
    return
  }
}
module.exports = toNegative
