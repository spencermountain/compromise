import unTag from '../../../../../1-one/tag/methods/unTag.js'
import fastTag from '../_fastTag.js'
import { hasAny } from '../../../../_lib.js'
import { RomanNumeral, Acronym, NN, Place, Plur, Org } from '../../../tagSet/_lib.js'

const oneLetterAcronym = /^[A-Z]('s|,)?$/
const isUpperCase = /^[A-Z-]+$/
const upperThenS = /^[A-Z]+s$/
const periodAcronym = /^([A-Z]\.)+[A-Z]?,?$/
const noPeriodAcronym = /^[A-Z]{2,}('s|,)?$/
const lowerCaseAcronym = /^([a-z]\.)+[a-z]\.?$/

const oneLetterWord = {
  I: true,
  A: true,
}

// only assume these are places if they are uppercased
const places = {
  la: true,
  ny: true,
  us: true,
  dc: true,
  gb: true,
  uk: true,
}

// just uppercase acronyms, no periods - 'UNOCHA'
const isNoPeriodAcronym = function (term, model) {
  let str = term.text
  // ensure it's all upper-case
  if (!isUpperCase.test(str)) {
    // allow lower-case plural - 'MMVAs'
    if (str.length > 3 && upperThenS.test(str)) {
      str = str.replace(/s$/, '')
    } else {
      return false
    }
  } else if (Object.hasOwn(places, term.normal)) {
    // NY, US, UK, etc.
    return true
  }
  // long capitalized words are not usually either
  if (str.length > 5) {
    return false
  }
  // 'I' is not a acronym
  if (Object.hasOwn(oneLetterWord, str)) {
    return false
  }
  // known-words, like 'PIZZA' is not an acronym.
  if (Object.hasOwn(model.one.lexicon, term.normal)) {
    return false
  }
  //like N.D.A
  if (periodAcronym.test(str)) {
    return true
  }
  //like c.e.o
  if (lowerCaseAcronym.test(str)) {
    return true
  }
  //like 'F.'
  if (oneLetterAcronym.test(str)) {
    return true
  }
  //like NDA
  if (noPeriodAcronym.test(str)) {
    return true
  }
  return false
}

// clear any tags, and make it an acronym
const toAcronym = (term, model, reason) => {
  unTag([term], '*', model.one.tagSet, '3-acronym')
  fastTag(term, [Acronym, NN], reason)
}

const isAcronym = function (terms, i, model) {
  const term = terms[i]
  //these are not acronyms
  if (hasAny(term, RomanNumeral, Acronym) || term.frozen) {
    return null
  }
  //non-period ones are harder
  if (isNoPeriodAcronym(term, model)) {
    toAcronym(term, model, '3-no-period-acronym')
    // ny, la
    if (places[term.normal] === true) {
      fastTag(term, Place, '3-place-acronym')
    }
    // UFOs
    if (upperThenS.test(term.text)) {
      fastTag(term, Plur, '3-plural-acronym')
    }
    // if(term.normal
    return true
  }
  // one-letter acronyms
  if (!Object.hasOwn(oneLetterWord, term.text) && oneLetterAcronym.test(term.text)) {
    toAcronym(term, model, '3-one-letter-acronym')
    return true
  }
  //if it's a very-short organization?
  if (term.tags.has(Org) && term.text.length <= 3) {
    fastTag(term, Acronym, '3-org-acronym')
    return true
  }
  // upper-case org, like UNESCO
  if (term.tags.has(Org) && isUpperCase.test(term.text) && term.text.length <= 6) {
    fastTag(term, Acronym, '3-titlecase-acronym')
    return true
  }
  return null
}
export default isAcronym
