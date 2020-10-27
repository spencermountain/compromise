const regex = require('./data/startsWith')

const romanNumeral = /^[IVXLCDM]{2,}$/
const romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/ //  https://stackoverflow.com/a/267405/168877

//try each of the ^regexes in our list
const checkRegex = function (term, world) {
  let str = term.text
  // do them all!
  for (let r = 0; r < regex.length; r += 1) {
    if (regex[r][0].test(str) === true) {
      term.tagSafe(regex[r][1], 'prefix #' + r, world)
      break
    }
  }
  // do some more!
  //roman numberals - XVII
  if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
    term.tag('RomanNumeral', 'xvii', world)
  }
}
module.exports = checkRegex
