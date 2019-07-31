const rules = require('./rules')
const fromTense = require('./fromTense')

const toInfinitive = function(parsed, world) {
  let verb = parsed.verb

  //1. if it's already infinitive
  let str = verb.out('normal')
  if (verb.has('#Infinitive')) {
    return str
  }
  //2. look at known irregulars
  if (world.lexicon.hasOwnProperty(str) === true) {
    let irregs = world.irregulars.verbs
    let keys = Object.keys(irregs)
    for (let i = 0; i < keys.length; i++) {
      let forms = Object.keys(irregs[keys[i]])
      for (let o = 0; o < forms.length; o++) {
        if (str === irregs[keys[i]][forms[o]]) {
          return keys[i]
        }
      }
    }
  }
  //3. look at our rules
  let tense = fromTense(verb)
  if (tense && rules[tense]) {
    for (let i = 0; i < rules[tense].length; i++) {
      const rule = rules[tense][i]
      if (rule.reg.test(str) === true) {
        return str.replace(rule.reg, rule.to)
      }
    }
  }
  // fallback
  return str
}
module.exports = toInfinitive
