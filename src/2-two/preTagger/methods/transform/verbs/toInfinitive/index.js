import { convert } from 'suffix-thumb'
import getTense from '../getTense/index.js'

const toParts = function (str, model) {
  let prefix = ''
  let prefixes = {}
  if (model.one && model.one.prefixes) {
    prefixes = model.one.prefixes
  }
  // pull-apart phrasal verb 'fall over'
  let [verb, particle] = str.split(/ /)
  // support 'over cleaned'
  if (particle && prefixes[verb] === true) {
    prefix = verb
    verb = particle
    particle = ''
  }
  return {
    prefix, verb, particle
  }
}

const pluralCopula = new Set(['are', 'were', 'been'])
const singCopula = new Set(['is', 'am', 'was', 'be', 'being'])

const toInfinitive = function (str, model, tense) {
  const { fromPast, fromPresent, fromGerund, fromParticiple } = model.two.models
  let { prefix, verb, particle } = toParts(str, model)
  let inf = ''
  if (!tense) {
    tense = getTense(str)
  }
  if (pluralCopula.has(str)) {
    inf = 'be'
  } else if (singCopula.has(str)) {
    inf = 'be'
  } else if (tense === 'Participle') {
    inf = convert(verb, fromParticiple)
  } else if (tense === 'PastTense') {
    inf = convert(verb, fromPast)
  } else if (tense === 'PresentTense') {
    inf = convert(verb, fromPresent)
  } else if (tense === 'Gerund') {
    inf = convert(verb, fromGerund)
  } else {
    return str
  }

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

// console.log(toInfinitive('snarled', { one: {} }))
// console.log(convert('snarled', fromPast))