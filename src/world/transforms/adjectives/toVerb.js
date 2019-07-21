//turn an adjective like 'soft' into a verb like 'soften'
//(don't do words like 'green' -> 'greenen')
const dontDo = /y$/

const irregulars = {
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten',
}

const toVerb = str => {
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str]
  }
  //don't bother with these
  if (dontDo.test(str)) {
    return null
  }

  if (/e$/.test(str) === true) {
    return str + 'n'
  }
  return str + 'en'
}
module.exports = toVerb
