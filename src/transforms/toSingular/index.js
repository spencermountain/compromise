const rules = require('./_rules')

const toSingular = function(str) {
  // does it even inflect, in the first place?
  // if (hasPlural(doc) === false) {
  //   return doc
  // }
  // let str = doc.text('normal').trim()
  // check irregulars list
  // if (irregulars.hasOwnProperty(str)) {
  //   return irregulars[str]
  // }

  // go through our regexes
  for (let i = 0; i < rules.length; i++) {
    if (rules[i][0].test(str) === true) {
      str = str.replace(rules[i][0], rules[i][1])
      return str
    }
  }
  return str
}
module.exports = toSingular
