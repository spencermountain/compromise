import fastTag from '../_fastTag.js'

const oneLetterAcronym = /^[A-Z]('s|,)?$/
const isUpperCase = /^[A-Z-]+$/
const periodAcronym = /([A-Z]\.)+[A-Z]?,?$/
const noPeriodAcronym = /[A-Z]{2,}('s|,)?$/
const lowerCaseAcronym = /([a-z]\.)+[a-z]\.?$/

const oneLetterWord = {
  I: true,
  A: true,
}
// just uppercase acronyms, no periods - 'UNOCHA'
const isNoPeriodAcronym = function (term, model) {
  let str = term.text
  // ensure it's all upper-case
  if (isUpperCase.test(str) === false) {
    return false
  }
  // long capitalized words are not usually either
  if (str.length > 5) {
    return false
  }
  // 'I' is not a acronym
  if (oneLetterWord.hasOwnProperty(str)) {
    return false
  }
  // known-words, like 'PIZZA' is not an acronym.
  if (model.one.lexicon.hasOwnProperty(term.normal)) {
    return false
  }
  //like N.D.A
  if (periodAcronym.test(str) === true) {
    return true
  }
  //like c.e.o
  if (lowerCaseAcronym.test(str) === true) {
    return true
  }
  //like 'F.'
  if (oneLetterAcronym.test(str) === true) {
    return true
  }
  //like NDA
  if (noPeriodAcronym.test(str) === true) {
    return true
  }
  return false
}

const isAcronym = function (terms, i, model) {
  let term = terms[i]
  //these are not acronyms
  if (term.tags.has('RomanNumeral') || term.tags.has('Acronym')) {
    return null
  }
  //non-period ones are harder
  if (isNoPeriodAcronym(term, model)) {
    term.tags.clear()
    fastTag(term, ['Acronym', 'Noun'], '3-no-period-acronym')
    return true
  }
  // one-letter acronyms
  if (!oneLetterWord.hasOwnProperty(term.text) && oneLetterAcronym.test(term.text)) {
    term.tags.clear()
    fastTag(term, ['Acronym', 'Noun'], '3-one-letter-acronym')
    return true
  }
  //if it's a very-short organization?
  if (term.tags.has('Organization') && term.text.length <= 3) {
    fastTag(term, 'Acronym', '3-org-acronym')
    return true
  }
  // upper-case org, like UNESCO
  if (term.tags.has('Organization') && isUpperCase.test(term.text) && term.text.length <= 6) {
    fastTag(term, 'Acronym', '3-titlecase-acronym')
    return true
  }
  return null
}
export default isAcronym
