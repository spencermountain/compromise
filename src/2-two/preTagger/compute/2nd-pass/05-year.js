import fastTag from '../_fastTag.js'
const min = 1400
const max = 2100

const dateWords = new Set(
  'in',
  'on',
  'by',
  'for',
  'during',
  'within',
  'before',
  'after',
  'of',
  'this',
  'next',
  'last',
)

const seemsGood = function (term) {
  if (!term) {
    return false
  }
  if (dateWords.has(term.normal)) {
    return true
  }
  if (term.tags.has('Date') || term.tags.has('Month') || term.tags.has('WeekDay')) {
    return true
  }
}

// recognize '1993' as a year
const tagYear = function (terms, i) {
  const term = terms[i]
  if (term.tags.has('NumericValue') && term.tags.has('Cardinal')) {
    let num = Number(term.normal)
    // number between 1400 and 2100
    if (num && !isNaN(num) && num > min && num < max) {
      if (seemsGood(terms[i - 1]) || seemsGood(terms[i + 1])) {
        fastTag(term, 'Year', '2-tagYear')
      }
    }
  }
}
export default tagYear