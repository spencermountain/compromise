import fastTag from '../_fastTag.js'
import { hasAny, toSet } from '../../../../_lib.js'
import { Date, WeekDay, Year, Prop, Ord, Card, Val, Numeric, Det, Poss, NN, Plur, Month } from '../../../tagSet/_lib.js'
const min = 1400
const max = 2100
const possessive = /^[0-9]{4}'s$/
// 'the 2020's', 'the early 2020's'
const beforeDecade = toSet('the early mid late')

const dateWords = toSet('in on by until since for to during throughout through within before after of this next last circa around post pre budget classic plan may')

// a date-ish neighbour
const seemsFine = term => term && hasAny(term, Date, Month, WeekDay, Year)

const seemsGood = function (term) {
  if (!term) {
    return false
  }
  const str = term.normal || term.implicit
  if (dateWords.has(str)) {
    return true
  }
  if (seemsFine(term)) {
    return true
  }
  // 1999 Film Festival
  if (term.tags.has(Prop)) {
    return true
  }
  return false
}

const seemsOkay = function (term) {
  if (!term) {
    return false
  }
  if (term.tags.has(Ord)) {
    return true
  }
  // untagged 'june 13 2007'
  if (term.tags.has(Card) && term.normal.length < 3) {
    return true
  }
  // 2020 was ..
  if (term.normal === 'is' || term.normal === 'was') {
    return true
  }
  return false
}

// (step 3 of the 's decision - the list is in contraction-two/compute/index.js)
// a possessive is good evidence for a year, like '2020's election'
const tagPossessive = function (terms, i) {
  const num = parseInt(terms[i].normal, 10)
  if (num <= min || num >= max) {
    return null
  }
  // but these are decades - '1980's music', 'the 2020's'
  if (num % 10 === 0 && (num < 2000 || beforeDecade.has(terms[i - 1]?.normal))) {
    return null
  }
  return fastTag(terms[i], [Val, Card, Numeric, Year, Date], '2-tagYear-possessive')
}

// recognize '1993' as a year
const tagYear = function (terms, i) {
  const term = terms[i]
  if (term.normal.length === 6 && possessive.test(term.normal)) {
    return tagPossessive(terms, i)
  }
  if (term.tags.has(Numeric) && term.tags.has(Card) && term.normal.length === 4) {
    const num = Number(term.normal)
    // number between 1400 and 2100
    if (num && !isNaN(num)) {
      if (num > min && num < max) {
        const lastTerm = terms[i - 1]
        const nextTerm = terms[i + 1]
        if (seemsGood(lastTerm) || seemsGood(nextTerm)) {
          return fastTag(term, Year, '2-tagYear')
        }
        // or is it really-close to a year?
        if (num >= 1920 && num < 2025) {
          // look at neighbours
          if (seemsOkay(lastTerm) || seemsOkay(nextTerm)) {
            return fastTag(term, Year, '2-tagYear-close')
          }
          // look at far-neighbours
          if (seemsFine(terms[i - 2]) || seemsFine(terms[i + 2])) {
            return fastTag(term, Year, '2-tagYear-far')
          }
          // 'the 2002 hit', 'my 1950 convertable'
          if (lastTerm && hasAny(lastTerm, Det, Poss)) {
            if (nextTerm && nextTerm.tags.has(NN) && !nextTerm.tags.has(Plur)) {
              return fastTag(term, Year, '2-tagYear-noun')
            }
          }
        }
      }
    }
  }
  return null
}

export default tagYear
