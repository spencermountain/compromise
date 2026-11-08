import parse from './parse/index.js'
import { bigs, ordSuffix, pow10 } from './_words.js'

// { hundred: 100, thousand: 1000, ... }
const mults = {}
bigs.forEach((w, i) => {
  mults[w] = i === 0 ? 100 : pow10(3 * i)
})

// western '1,000,000' or lakh '1,00,000'
const goodCommas = /^[0-9]{1,3}(,[0-9]{3})+$|^[0-9]{1,2}(,[0-9]{2})*,[0-9]{3}$/
const numericForm = /^[-+]?\p{Sc}?([0-9][0-9,]*)(\.[0-9]+)?(?:\/([0-9]+))?([a-z]*)/iu
// a doubled sign like '--5', or a stray '%5'
const badPre = /[-+]\s?[-+]|%/
const zeroWord = /\b(zero|nil|nought|naught|zilch|oh)\b|(^|[^0-9.])0/

// checks on the written form of a single numeric term, like '21th' or '1,000,00'
const checkNumeric = term => {
  if (badPre.test(term.pre)) {
    return false
  }
  const m = term.text.match(numericForm)
  if (!m) {
    return true
  }
  const [, intPart, decimal, denom, letters] = m
  const digits = intPart.replace(/,/g, '')
  // more digits than a Number can hold
  if (digits.length > 15) {
    return false
  }
  if (intPart.includes(',') && !goodCommas.test(intPart)) {
    return false
  }
  // division by zero
  if (denom !== undefined && /^0+$/.test(denom)) {
    return false
  }
  // ordinal suffix - the tagger allows '4rth'
  const suffix = letters.toLowerCase().replace(/^rth/, 'th')
  if (/^(st|nd|rd|th)/.test(suffix)) {
    const base = denom === undefined ? digits : denom
    // no '3.5th', '-1st', or '0th'
    if ((decimal && denom === undefined) || term.text.startsWith('-') || /^0+$/.test(base)) {
      return false
    }
    const want = ordSuffix(base)
    if (suffix !== want && suffix !== want + 's') {
      return false
    }
  }
  return true
}

// multipliers must climb, unless a count comes between - 'two million three thousand'
const checkMultiples = terms => {
  let last = null
  for (let i = 0; i < terms.length; i += 1) {
    const w = terms[i].normal
    if (Object.hasOwn(mults, w)) {
      if (last !== null && mults[w] <= last) {
        return false
      }
      last = mults[w]
    } else if (w !== 'a' && w !== 'and') {
      last = null
    }
  }
  return true
}

// drop matches that do not parse to a usable number
const isValid = function (doc) {
  return doc.filter(val => {
    const terms = val.docs[0]
    const { num } = parse(val)
    if (typeof num !== 'number' || !Number.isFinite(num)) {
      return false
    }
    // unparseable words come back as 0
    if (num === 0 && !zeroWord.test(terms.map(t => t.normal).join(' '))) {
      return false
    }
    if (terms.length === 1 && /[0-9]/.test(terms[0].text)) {
      return checkNumeric(terms[0])
    }
    return checkMultiples(terms)
  })
}
export default isValid
