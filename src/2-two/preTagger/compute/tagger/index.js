
import checkPunct from './1st-pass/01-punctuation.js'

import tagSwitch from './2nd-pass/00-tagSwitch.js'
import checkCase from './2nd-pass/01-case.js'
import checkSuffix from './2nd-pass/02-suffix.js'
import checkRegex from './2nd-pass/03-regex.js'
import checkPrefix from './2nd-pass/04-prefix.js'
import checkYear from './2nd-pass/05-year.js'
import verbType from './3rd-pass/06-verb-type.js'

import fillTags from './3rd-pass/_fillTags.js'
import checkAcronym from './3rd-pass/01-acronym.js'
import neighbours from './3rd-pass/02-neighbours.js'
import orgWords from './3rd-pass/03-orgWords.js'
import nounFallback from './3rd-pass/04-fallback.js'
import switches from './3rd-pass/06-switches.js'
import imperative from './3rd-pass/07-imperative.js'

const first = {
  checkPunct,
}
const second = {
  tagSwitch,
  checkSuffix,
  checkRegex,
  checkCase,
  checkPrefix,
  checkYear,
  verbType
}

const third = {
  checkAcronym,
  neighbours,
  orgWords,
  nounFallback,
  switches,
  imperative
}

// is it all yelling-case?
const ignoreCase = function (terms) {
  // allow 'John F Kennedy'
  if (terms.filter(t => !t.tags.has('ProperNoun')).length <= 3) {
    return false
  }
  const lowerCase = /^[a-z]/
  return terms.every(t => !lowerCase.test(t.text))
}

const firstPass = function (docs, model, world) {
  // first-pass
  docs.forEach(terms => {
    // check whitespace/punctuation
    first.checkPunct(terms, 0, model, world)
  })
}

// these methods don't care about word-neighbours
const secondPass = function (terms, model, world, yelling) {
  for (let i = 0; i < terms.length; i += 1) {
    // mark Noun|Verb on term metadata
    second.tagSwitch(terms, i, model)
    //  is it titlecased?
    if (yelling === false) {
      second.checkCase(terms, i, model)
    }
    // look at word ending
    second.checkSuffix(terms, i, model)
    // try look-like rules
    second.checkRegex(terms, i, model, world)
    // check for recognized prefix, like 'micro-'
    second.checkPrefix(terms, i, model)
    // turn '1993' into a year
    second.checkYear(terms, i, model)

  }
}

const thirdPass = function (terms, model, world, yelling) {
  for (let i = 0; i < terms.length; i += 1) {
    // let these tags get layered
    let found = third.checkAcronym(terms, i, model)
    // deduce parent tags
    fillTags(terms, i, model)
    // look left+right for hints
    found = found || third.neighbours(terms, i, model)
    //  ¯\_(ツ)_/¯ - found nothing
    found = found || third.nounFallback(terms, i, model)
  }
  for (let i = 0; i < terms.length; i += 1) {
    // Johnson LLC
    third.orgWords(terms, i, world, yelling)
    // verb-noun disambiguation, etc
    third.switches(terms, i, world)
    // give bare verbs more tags
    second.verbType(terms, i, model, world)
  }
  // place tea bags
  third.imperative(terms, world)
}

const preTagger = function (view) {
  const { methods, model, world } = view
  let docs = view.docs
  // try some early stuff
  firstPass(docs, model, world)
  // roughly split sentences up by clause
  let document = methods.two.quickSplit(docs)
  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // is it all upper-case?
    const yelling = ignoreCase(terms)
    // guess by the letters
    secondPass(terms, model, world, yelling)
    // guess by the neighbours
    thirdPass(terms, model, world, yelling)
  }
  return document
}

export default preTagger
