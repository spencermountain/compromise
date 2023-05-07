import doRules from './lib.js'

const suffixes = [
  null,
  {
    'y': 'iness',
  },
  {
    'le': 'ility',
    'al': 'ality',
    'ay': 'ayness',
    'rm': 'rmth',
    'pt': 'ptitude',
    'he': 'heness ',
    'ct': 'ction',
    'id': 'idity',
    'ic': 'ism',
    'nt': 'ncy',
    // 'al': 'ality',
  },
  {
    'ial': 'y',
    'ing': 'ingness',
    // 'ing': 'ment',
    'ess': 'essness',
    'ous': 'ousness',
    'ive': 'ivity',
    'ect': 'ection',
    'yal': 'yalty',
    'ean': 'eanliness',
    'ain': 'ainty',
    'ave': 'avery',
    'est': 'esty',
    'ant': 'ance',
    'ent': 'ence',
    'ful': '',
  },
  {
    'ting': 'ting',
    'ring': 'ring',
    'cial': 'ciality',
    'nate': 'nation',
    'rate': 'ration',
    'bing': 'bingness',
    'atic': 'acy',//democratic
    'sing': 'se',
    'iful': 'y',//beautify, merciful
    'ible': 'ibility',//credible
    'tive': 'tion',
    'nial': 'niality'
  },
  {
    'erate': 'eration',
    'istic': 'ism',
    'ssive': 'ssion',
    'gical': 'gic'
    // 'tious': 'tion'
  },
  {
    'ionate': 'ion'
  },
]

const exceptions = {
  clean: 'cleanliness',
  naive: 'naivety',
  dramatic: 'drama',
  ironic: 'irony',
  deep: 'depth',
  automatic: 'automation',
  simple: 'simplicity',
  boring: 'boredom',
  free: 'freedom',
  wise: 'wisdom',
  fortunate: 'fortune',
  gentle: 'gentleness',
  quiet: 'quiet',
  expensive: 'expense',
  offensive: 'offence',
  modest: 'modesty',
  hot: 'heat',
  curious: 'curiosity',
  beautiful: 'beauty',
  discreet: 'discretion',
  suspicious: 'suspicion',
  witty: 'wit',
  young: 'youth',
  romantic: 'romance',
  poor: 'poverty',
  practical: 'practicality',
  sensitive: 'sensitivity',
  valuable: 'value',
  spontaneous: 'spontaneity',
  humble: 'humility',
  furious: 'fury',
  generous: 'generosity',
  exciting: 'excitement',
  accurate: 'accuracy',
  agile: 'agility',
  active: 'activity',
  agitated: 'agitation',
  authentic: 'authenticity',
  comfortable: 'comfort'
}

const dontDo = new Set([
  'terrible',
  'annoying',
  'heroic',
  'docile',
])

// a lot of adjectives *don't really* have a noun-form
// 'broken' -> 'brokeness'?
// 'surreal' -> 'surrealness'?
// but here, conjugate what it would be, if it made sense to
const toNoun = function (str) {
  if (exceptions.hasOwnProperty(str)) {
    return exceptions[str]
  }
  if (dontDo.has(str)) {
    return null
  }
  let res = doRules(str, suffixes)
  if (res) {
    return res
  }
  // let maybe = str + 'ness'
  // if (model && model.one && model.one.lexicon) { }
  return str + 'ness'
}
export default toNoun
// console.log(toNoun('authentic'))