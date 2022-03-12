const rules = [
  {},
  {},
  { 'ly': '' },
  {
    'ily': 'y',
    'bly': 'ble',
  },
  {
    'ally': 'al',
  },
  {
    'ually': 'ual',
    'ially': 'ial',
    'cally': 'cal',
    'eally': 'eal',
    'rally': 'ral',
    'nally': 'nal',
    'mally': 'mal',
  },
]

// exceptions to rules
const exceptions = {
  'early': null,
  'only': null,
  'daily': null,
  'mostly': null,
  'especially': null,
  'undoubtedly': null,
  'wholly': 'whole',
  'fully': 'full',
  dramatically: 'dramatic',
  electronically: 'electronic',
  genetically: 'genetic'
  // '',
}
//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  let max = len <= 5 ? len - 1 : 5
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
  if (exceptions.hasOwnProperty(str)) {
    return exceptions[str]
  }
  return suffixLoop(str, rules)
}
export default toAdjective

// console.log(toAdjective('informally'))
// console.log(toAdjective('usually'))
// console.log(toAdjective('fully'))