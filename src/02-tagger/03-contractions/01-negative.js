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

const checkNegative = function(term) {
  //check named-ones
  if (irregulars.hasOwnProperty(term.clean) === true) {
    return irregulars[term.clean]
  }
  //try it normally
  if (hasNegative.test(term.clean) === true) {
    let main = term.clean.replace(hasNegative, '')
    return [main, 'not']
  }
  return null
}
module.exports = checkNegative
