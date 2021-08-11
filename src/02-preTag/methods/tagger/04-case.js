import setTag from './_setTag.js'

const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/
const hasNumber = /[0-9]/

// https://stackoverflow.com/a/267405/168877
const romanNumeral = /^[IVXLCDM]{2,}$/
const romanNumValid = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

// if it's a unknown titlecase word, it's a propernoun
const checkCase = function (term, i) {
  let str = term.text //need case info
  // titlecase and not first word of sentence
  if (i !== 0 && titleCase.test(str) === true && hasNumber.test(str) === false) {
    term.tags.delete('Verb')
    term.tags.delete('Adjective')
    term.tags.delete('Adverb')
    setTag(term, 'ProperNoun', 'titlecase')
    return true
  }

  //roman numberals - XVII
  if (term.text.length >= 2 && romanNumeral.test(str) && romanNumValid.test(str)) {
    setTag(term, 'RomanNumeral', 'xvii')
    return true
  }

  return null
}
export default checkCase
