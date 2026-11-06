import fastTag from '../_fastTag.js'
import spokenYear from '../../../methods/spokenYear.js'

// no punctuation between these words - not 'twenty, twenty one'
const joined = /^( +|-)$/
// these neighbours make it a count - some units are only found in the postTagger
const counted = ['Value', 'Unit', 'Currency', 'Duration']

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
  // the clock-time 'at twenty thirty'
  if (prev.normal === 'at') {
    return true
  }
  // 'five twenty twenty', but not 'june five twenty twenty' - 'march' and 'may' aren't months yet
  const month = terms[i - 2]
  return prev.tags.has('Cardinal') && !month?.tags.has('Month') && !/^(march|may)$/.test(month?.normal)
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
  if (counted.some(tag => next.tags.has(tag))) {
    return true
  }
  // 'twenty twenty vision', but not 'twenty thirty vision'
  return year.length === 2 && year[1].normal === 'twenty' && /^(vision|hindsight)$/.test(next.normal)
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
  year.forEach(term => fastTag(term, ['Year', 'Date'], '2-spoken-year'))
  return true
}

export default tagSpokenYear
