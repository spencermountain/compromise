const hasNegative = /n't$/

const irregulars = {
  "won't": ['will', 'not'],
  wont: ['will', 'not'],
  "can't": ['can', 'not'],
  cant: ['can', 'not'],
  cannot: ['can', 'not'],
  "shan't": ['should', 'not'],
  dont: ['do', 'not'],
  dun: ['do', 'not'],
  // "ain't" is ambiguous for is/was
}

// either 'is not' or 'are not'
const doAint = function (term, phrase) {
  let terms = phrase.terms()
  let index = terms.indexOf(term)
  let before = terms.slice(0, index)
  //look for the preceding noun
  let noun = before.find(t => {
    return t.tags.Noun
  })
  if (noun && noun.tags.Plural) {
    return ['are', 'not']
  }
  return ['is', 'not']
}

const checkNegative = function (term, phrase) {
  //check named-ones
  if (irregulars.hasOwnProperty(term.clean) === true) {
    return irregulars[term.clean]
  }
  //this word needs it's own logic:
  if (term.clean === `ain't` || term.clean === 'aint') {
    return doAint(term, phrase)
  }
  //try it normally
  if (hasNegative.test(term.clean) === true) {
    let main = term.clean.replace(hasNegative, '')
    return [main, 'not']
  }
  return null
}
module.exports = checkNegative
