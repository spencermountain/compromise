import fastTag from '../_fastTag.js'
import spokenYear from '../../../methods/spokenYear.js'
import { Val, Unit, Card, Year, Date, TxtNum } from '../../../tagSet/_lib.js'

// no punctuation between these words - not 'twenty, twenty one'
const joined = /^( +|-)$/
// these neighbours make it a count - some units are only found in the postTagger
const counted = [Val, Unit, 'Currency', 'Duration']
// other measures, that are not tagged as units
const measures = /^(times|euro|penny|quid|nickels|kms|kgs|lbs|metres?|tons|degrees?|calories|watts)$/
// clock-times and game scores - 'at twenty thirty', 'we won twenty ten'
const notBefore = /^(at|won|lost|tied|drew)$/
// 'twenty twenty vision', but not 'twenty thirty vision'
const idioms = /^(vision|hindsight|foresight|eyesight|cricket)$/

// find the longest form of year, starting here
const getYear = function (terms, i) {
  for (let len = 3; len >= 2; len -= 1) {
    const found = terms.slice(i, i + len)
    const isWhole = found.length === len && found.slice(0, -1).every(t => joined.test(t.post))
    if (isWhole && spokenYear(found.map(t => t.normal)) !== null) {
      return found
    }
  }
  return null
}

const isCountLeft = function (terms, i) {
  const prev = terms[i - 1]
  if (!prev || !joined.test(prev.post)) {
    return false
  }
  if (notBefore.test(prev.normal)) {
    return true
  }
  // 'five twenty twenty', but not 'june five twenty twenty' - 'march' and 'may' aren't months yet
  const month = terms[i - 2]
  return prev.tags.has(Card) && !month?.tags.has('Month') && !/^(march|may)$/.test(month?.normal)
}

const isCountRight = function (year, next) {
  const last = year.at(-1)
  // 'twenty thirty-page reports'
  if (last.post === '-') {
    return true
  }
  if (!next || !joined.test(last.post)) {
    return false
  }
  if (counted.some(tag => next.tags.has(tag)) || measures.test(next.normal)) {
    return true
  }
  return year.length === 2 && year[1].normal === 'twenty' && idioms.test(next.normal)
}

// recognize 'twenty twenty-six' as a year, before it can become a titlecase noun
const tagSpokenYear = function (terms, i) {
  if (terms[i].normal !== 'twenty') {
    return null
  }
  const year = getYear(terms, i)
  if (year === null || isCountLeft(terms, i) || isCountRight(year, terms[i + year.length])) {
    return null
  }
  // the lexicon doesn't know a possessive, like 'twenty's'
  year.forEach(term => fastTag(term, [Year, Date, Val, TxtNum, Card], '2-spoken-year'))
  return true
}

export default tagSpokenYear
