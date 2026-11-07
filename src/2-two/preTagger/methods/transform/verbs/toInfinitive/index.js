import { convert } from 'suffix-thumb'
import getTense from '../getTense/index.js'
import { Participle, Past, Pres, Ger } from '../../../../tagSet/_lib.js'

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


// dunno about these..
const copulaMap = {
  are: 'be',
  were: 'be',
  been: 'be',
  is: 'be',
  am: 'be',
  was: 'be',
  be: 'be',
  being: 'be',
}

const toInfinitive = function (str, model, tense) {
  const { fromPast, fromPresent, fromGerund, fromParticiple } = model.two.models
  const { prefix, verb, particle } = toParts(str, model)
  let inf = ''
  if (!tense) {
    tense = getTense(str)
  }
  // a sentence-start can keep its case: 'Is happy'
  const lower = str.toLowerCase()
  if (Object.hasOwn(copulaMap, lower)) {
    inf = copulaMap[lower]
  } else if (tense === Participle) {
    inf = convert(verb, fromParticiple)
  } else if (tense === Past) {
    inf = convert(verb, fromPast)
  } else if (tense === Pres) {
    inf = convert(verb, fromPresent)
  } else if (tense === Ger) {
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