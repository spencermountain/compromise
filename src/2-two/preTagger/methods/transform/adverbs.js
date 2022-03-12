const rules = [
  {},
  {},
  { 'ly': '' },
  {
    'ily': 'y',
    'bly': 'ble',
    'ply': 'ple',
  },
  {
    'ally': 'al',
    'rply': 'rp',
  },
  {
    'ually': 'ual',
    'ially': 'ial',
    'cally': 'cal',
    'eally': 'eal',
    'rally': 'ral',
    'nally': 'nal',
    'mally': 'mal',
    'eeply': 'eep',
    'eaply': 'eap',
  },
  {
    ically: 'ic',
  },
  // {
  //   tically: 'tic',
  //   nically: 'nic',
  //   gically: 'gic',
  //   fically: 'fic',
  // },
]
const s = 'ically'
const ical = new Set([
  'analyt' + s, //analytical
  'chem' + s,// chemical
  'class' + s, //classical
  'clin' + s, // clinical
  'crit' + s,// critical
  'ecolog' + s,// ecological
  'electr' + s,// electrical
  'empir' + s, // empirical
  'frant' + s, // frantical
  'grammat' + s,// grammatical
  'ident' + s, // identical
  'ideolog' + s, // ideological
  'log' + s, // logical
  'mag' + s, //magical
  'mathemat' + s,// mathematical
  'mechan' + s,// mechanical
  'med' + s,// medical
  'method' + s, // methodical
  'method' + s,// methodical
  'mus' + s, // musical
  'phys' + s, // physical
  'phys' + s,// physical
  'polit' + s,// political
  'pract' + s,// practical
  'rad' + s, //radical
  'satir' + s, // satirical
  'statist' + s, // statistical
  'techn' + s,// technical
  'technolog' + s, // technological
  'theoret' + s,// theoretical
  'typ' + s,// typical
  'vert' + s,// vertical
  'whims' + s,// whimsical
])

// exceptions to rules
const exceptions = {
  'early': null,
  'only': null,
  'hourly': null,
  'daily': null,
  'weekly': null,
  'monthly': null,
  'yearly': null,
  'mostly': null,
  'duly': null,
  'unduly': null,
  'especially': null,
  'undoubtedly': null,
  'conversely': null,
  'namely': null,
  'exceedingly': null,
  'presumably': null,
  'accordingly': null,
  'overly': null,
  'wholly': 'whole',
  'fully': 'full',
  'truly': 'true',
  'gently': 'gentle',
  'singly': 'single',
  customarily: 'customary',
}
//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  let max = len <= 6 ? len - 1 : 6
  for (let i = max; i > 1; i -= 1) {
    let suffix = str.substring(len - i, str.length)
    if (suffixes[suffix.length].hasOwnProperty(suffix) === true) {
      let pre = str.slice(0, len - i)
      let post = suffixes[suffix.length][suffix]
      return pre + post
    }
  }
  return str
}

const toAdjective = function (str) {
  if (!str.endsWith('ly')) {
    return null
  }
  // 'electronic' vs 'electronical'
  if (ical.has(str)) {
    return str.replace(/ically/, 'ical')
  }
  if (exceptions.hasOwnProperty(str)) {
    return exceptions[str]
  }
  return suffixLoop(str, rules)
}
export default toAdjective

// console.log(toAdjective('emphatically'))
// console.log(toAdjective('usually'))
// console.log(toAdjective('mechanically'))
// console.log(toAdjective('vertically'))