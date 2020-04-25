const rules = require('./_rules')

const invertObj = function (obj) {
  return Object.keys(obj).reduce((h, k) => {
    h[obj[k]] = k
    return h
  }, {})
}

const toSingular = function (str, world) {
  let irregulars = world.irregulars.nouns
  let invert = invertObj(irregulars) //(not very efficient)

  // check irregulars list
  if (invert.hasOwnProperty(str)) {
    return invert[str]
  }

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
