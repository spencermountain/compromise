const rules = [
  {},
  { 'ly': '' },
  {
    'ily': 'y',
    'bly': 'ble',
  },
  {
    'ally': '',
  },
  {
    'ually': 'ual',
    'ially': 'ial',
    'cally': 'c',
    'eally': 'eal',
    'rally': 'ral',
    'nally': 'nal',
    'mally': 'mal',
  },

]

//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i > 1; i -= 1) {
    let suffix = str.substr(len - i, len)
    if (suffixes[suffix.length].hasOwnProperty(suffix) === true) {
      // console.log(suffix)
      let tag = suffixes[suffix.length][suffix]
      return tag
    }
  }
  return null
}

const toAdjective = function (str) {
  return suffixLoop(str, rules)
}
export default toAdjective