//turn an adjective like 'soft' into a verb like 'soften'
//(don't do words like 'green' -> 'greenen')

//these are suffices that are usually too weird
let dontDo = ['c', 'e', 'g', 'l', 'n', 'r', 'w', 'y'].reduce((h, c) => {
  h[c] = true
  return h
}, {})

const dontDoTwo = { ed: true, nt: true }

const banList = {
  random: true,
  wild: true,
}

const irregulars = {
  bored: 'bore',
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten',
  small: 'shrink',
  full: 'fill',
  tired: 'tire',
}

const toVerb = (str) => {
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str]
  }
  //don't bother with these:
  if (str.length <= 3) {
    return null
  }
  if (banList.hasOwnProperty(str) === true) {
    return null
  }
  //suffixes to avoid
  if (dontDo.hasOwnProperty(str[str.length - 1])) {
    return null
  }
  let suffix = str.substr(str.length - 2)
  if (dontDoTwo.hasOwnProperty(suffix) === true) {
    return null
  }

  if (/e$/.test(str) === true) {
    return str + 'n'
  }
  return str + 'en'
}
module.exports = toVerb
