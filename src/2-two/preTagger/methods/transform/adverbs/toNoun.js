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
  },
  {
    'ial': 'y',
    'ing': 'ment',
    'ess': 'essness',
    'ous': 'ousness',
    'ive': 'ivity',
    'ect': 'ection'
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
    'ible': 'ibility'//credible
  },
  {
    'erate': 'eration'

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
  offensive: 'offence'
}

const dontDo = new Set([
  'terrible',
  'annoying',
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
  return str + 'ness'
}
export default toNoun
// console.log(toNoun('clever'))