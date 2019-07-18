const romanNum = /^[IVXCM]+$/
const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/

const apostrophes = /[\'‘’‛‵′`´]/

const oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true,
}

//
const checkPunctuation = function(terms, i, world) {
  let term = terms[i]
  let str = term.text
  //check titlecase (helpful)
  if (titleCase.test(str) === true) {
    term.tag('TitleCase', 'punct-rule', world)
  }
  //check hyphenation
  if (term.postText.indexOf('-') !== -1 && terms[i + 1] && terms[i + 1].preText === '') {
    term.tag('Hyphenated', 'has-hyphen', world)
  }
  //check one-letter acronyms like 'john E rockefeller'
  if (str.length === 1 && terms[i + 1] && /[A-Z]/.test(str) && !oneLetters[str.toLowerCase()]) {
    term.tag('Acronym', 'one-letter-acronym', world)
  }
  //roman numerals (not so clever right now)
  if (term.text.length > 1 && romanNum.test(term.text) === true) {
    term.tagSafe('RomanNumeral', 'is-roman-numeral', world)
  }
  //'100+'
  if (/[0-9]\+$/.test(term.text) === true) {
    term.tag('NumericValue', 'number-plus', world)
  }
  //an end-tick (trailing apostrophe) - flanders', or Carlos'
  if (apostrophes.test(term.postText)) {
    term.tag(['Possessive', 'Noun'], 'end-tick', world)
  }
}
module.exports = checkPunctuation
