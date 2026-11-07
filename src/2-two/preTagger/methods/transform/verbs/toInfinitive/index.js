import { convert } from 'suffix-thumb'
import getTense from '../getTense/index.js'
import { toSet } from '../../../../../_lib.js'
import { Participle, Past, Pres, Ger } from '../../../../tagSet/_lib.js'

const toParts = function (str, model) {
  let prefix = ''
  const prefixes = model.one?.prefixes || {}
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


// dunno about these..
const copulas = toSet('are were been is am was be being')

// which model turns each tense into an infinitive
const byTense = {
  [Participle]: 'fromParticiple',
  [Past]: 'fromPast',
  [Pres]: 'fromPresent',
  [Ger]: 'fromGerund',
}

const toInfinitive = function (str, model, tense) {
  const { prefix, verb, particle } = toParts(str, model)
  let inf = ''
  if (!tense) {
    tense = getTense(str)
  }
  // a sentence-start can keep its case: 'Is happy'
  const lower = str.toLowerCase()
  if (copulas.has(lower)) {
    inf = 'be'
  } else if (Object.hasOwn(byTense, tense)) {
    inf = convert(verb, model.two.models[byTense[tense]])
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