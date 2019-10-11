const guessVerb = require('./_guess')

/** it helps to know what we're conjugating from */
const pickTense = function(verb) {
  // 1. decide from known-tags
  if (verb.has('#PastTense')) {
    return 'PastTense'
  } else if (verb.has('#Gerund')) {
    return 'Gerund'
  } else if (verb.has('#PresentTense')) {
    return 'PresentTense'
  } else if (verb.has('#Participle')) {
    return 'Participle'
  } else if (verb.has('#Actor')) {
    return 'Actor'
  }
  // 2. guess a little-bit
  let str = verb.out('normal')
  let three = str.substr(str.length - 3)
  if (guessVerb.hasOwnProperty(three) === true) {
    return guessVerb[three]
  }
  let two = str.substr(str.length - 2)
  if (guessVerb.hasOwnProperty(two === true)) {
    return guessVerb[two]
  }
  let one = str.substr(str.length - 1)
  if (one === 's') {
    return 'PresentTense'
  }
  return null
}
module.exports = pickTense
