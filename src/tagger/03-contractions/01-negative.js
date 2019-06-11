const hasNegative = /n't$/

const irregulars = {
  "won't": ['will', 'not'],
  wont: ['will', 'not'],

  "can't": ['can', 'not'],
  cant: ['can', 'not'],
  cannot: ['can', 'not'],

  "shan't": ['should', 'not'],

  //("ain't" has is/was ambiguity)
}

const getRoot = function(str) {
  return str.replace(/n't$/, '')
}

const checkNegative = function(term) {
  //check named-ones
  if (irregulars.hasOwnProperty(term.normal) === true) {
    return irregulars[term.normal]
  }
  //try it normally
  if (hasNegative.test(term.normal) === true) {
    let main = getRoot(term.normal)
    return [main, 'not']
  }
  return null
}
module.exports = checkNegative
