import rules from './_transform.js'
import guessTense from '../getTense/index.js'

// lookup known irregular verb forms
const fromIrreg = function (str, model) {
  let irregs = model.two.irregularVerbs
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

// transform verb from regular expressions
const fromReg = function (str, tense) {
  // console.log(tense)
  tense = tense || guessTense(str)
  if (tense && rules[tense]) {
    for (let i = 0; i < rules[tense].length; i++) {
      const rule = rules[tense][i]
      if (rule.reg.test(str) === true) {
        // console.log(rule)
        return str.replace(rule.reg, rule.to)
      }
    }
  }
  return null
}

const toInfinitive = function (str, model, tense) {
  if (!str) {
    return ''
  }
  let prefixes = model.one.prefixes
  let prefix = ''
  // pull-apart phrasal verb 'fall over'
  let [verb, particle] = str.split(/ /)
  // support 'over cleaned'
  if (particle && prefixes[verb] === true) {
    prefix = verb
    verb = particle
    particle = ''
  }
  // 1. look at known irregulars
  // console.log(verb)
  let inf = fromIrreg(verb, model)
  // 2. give'r!
  inf = inf || fromReg(verb, tense) || verb
  // stitch phrasal back on
  if (particle) {
    inf += ' ' + particle
  }
  // stitch prefix back on
  if (prefix) {
    inf = prefix + ' ' + inf
  }
  return inf
}
export default toInfinitive

