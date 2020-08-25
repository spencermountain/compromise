const toInfinitive = require('./toInfinitive')
const isPlural = require('./isPlural')
// #Modal : would walk    -> 'would not walk'
// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk

const toNegative = function (parsed, world) {
  let vb = parsed.verb
  // if it's already negative...
  if (parsed.negative.found) {
    return
  }

  // would walk -> would not walk
  if (parsed.auxiliary.found) {
    parsed.auxiliary.eq(0).append('not')
    // 'would not have' ➔ 'would not have'
    if (parsed.auxiliary.has('#Modal have not')) {
      parsed.auxiliary.replace('have not', 'not have')
    }
    return
  }
  // is walking -> is not walking
  if (vb.has('(#Copula|will|has|had|do)')) {
    vb.append('not')
    return
  }
  // walked -> did not walk
  if (vb.has('#PastTense')) {
    let inf = toInfinitive(parsed, world)
    vb.replaceWith(inf, true)
    vb.prepend('did not')
    return
  }
  // walks -> does not walk
  if (vb.has('#PresentTense')) {
    let inf = toInfinitive(parsed, world)
    vb.replaceWith(inf, true)
    if (isPlural(parsed, world)) {
      vb.prepend('do not')
    } else {
      vb.prepend('does not')
    }
    return
  }
  //walking -> not walking
  if (vb.has('#Gerund')) {
    let inf = toInfinitive(parsed, world)
    vb.replaceWith(inf, true)
    vb.prepend('not')
    return
  }

  //fallback 1:  walk -> does not walk
  if (isPlural(parsed, world)) {
    vb.prepend('does not')
    return
  }
  //fallback 2:  walk -> do not walk
  vb.prepend('do not')
  return
}
module.exports = toNegative
