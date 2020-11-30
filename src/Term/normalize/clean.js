const killUnicode = require('./unicode')
const isAcronym = require('./isAcronym')
const hasSlash = /[a-z\u00C0-\u00FF] ?\/ ?[a-z\u00C0-\u00FF]/

/** some basic operations on a string to reduce noise */
const clean = function (str) {
  str = str || ''
  str = str.toLowerCase()
  str = str.trim()
  let original = str
  //(very) rough ASCII transliteration -  bjŏrk -> bjork
  str = killUnicode(str)
  //rough handling of slashes - 'see/saw'
  if (hasSlash.test(str) === true) {
    str = str.replace(/\/.*/, '')
  }
  //#tags, @mentions
  str = str.replace(/^[#@]/, '')
  //punctuation
  str = str.replace(/[,;.!?]+$/, '')
  // coerce single curly quotes
  str = str.replace(/[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]+/g, "'")
  // coerce double curly quotes
  str = str.replace(
    /[\u0022\u00AB\u00BB\u201C\u201D\u201E\u201F\u2033\u2034\u2036\u2037\u2E42\u301D\u301E\u301F\uFF02]+/g,
    '"'
  )
  //coerce Unicode ellipses
  str = str.replace(/\u2026/g, '...')
  //en-dash
  str = str.replace(/\u2013/g, '-')
  //lookin'->looking (make it easier for conjugation)
  str = str.replace(/([aeiou][ktrp])in$/, '$1ing')
  //turn re-enactment to reenactment
  if (/^(re|un)-?[^aeiou]./.test(str) === true) {
    str = str.replace('-', '')
  }
  //compact acronyms
  if (isAcronym(str)) {
    str = str.replace(/\./g, '')
  }
  //strip leading & trailing grammatical punctuation
  if (/^[:;]/.test(str) === false) {
    str = str.replace(/\.{3,}$/g, '')
    str = str.replace(/[",\.!:;\?\)]+$/g, '')
    str = str.replace(/^['"\(]+/g, '')
  }
  // remove zero-width characters
  str = str.replace(/[\u200B-\u200D\uFEFF]/g, '')

  //do this again..
  str = str.trim()
  //oh shucks,
  if (str === '') {
    str = original
  }

  //nice-numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2')
  return str
}

module.exports = clean
// console.log(normalize('Dr. V Cooper'));
