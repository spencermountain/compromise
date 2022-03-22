import fastTag from '../_fastTag.js'
const min = 1400
const max = 2100

const dateWords = new Set(['in', 'on', 'by', 'for', 'during', 'within', 'before', 'after', 'of', 'this', 'next', 'last', 'may'])

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
  return false
}

const seemsOkay = function (term) {
  if (!term) {
    return false
  }
  if (term.tags.has('Ordinal')) {
    return true
  }
  return false
}

// recognize '1993' as a year
const tagYear = function (terms, i) {
  const term = terms[i]
  if (term.tags.has('NumericValue') && term.tags.has('Cardinal') && term.normal.length === 4) {
    let num = Number(term.normal)
    // number between 1400 and 2100
    if (num && !isNaN(num)) {
      if (num > min && num < max) {
        if (seemsGood(terms[i - 1]) || seemsGood(terms[i + 1])) {
          return fastTag(term, 'Year', '2-tagYear')
        }
        // or is it really-close to a year?
        if (num > 1950 && num < 2025) {
          if (seemsOkay(terms[i - 1]) || seemsOkay(terms[i + 1])) {
            return fastTag(term, 'Year', '2-tagYear-close')
          }
        }
      }
    }
  }
  return null
}

export default tagYear