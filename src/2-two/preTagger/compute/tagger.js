import multiWord from './1st-pass/01-multiWord.js'
import checkLexicon from './1st-pass/02-lexicon.js'

import checkCase from './2nd-pass/01-case.js'
import checkSuffix from './2nd-pass/02-suffix.js'
import checkPrefix from './2nd-pass/03-prefix.js'
import checkRegex from './2nd-pass/04-regex.js'

import fillTags from './3rd-pass/_fillTags.js'
import checkAcronym from './3rd-pass/01-acronym.js'
import neighbours from './3rd-pass/02-neighbours.js'
import orgWords from './3rd-pass/03-orgWords.js'
import nounFallback from './3rd-pass/04-fallback.js'
import variables from './3rd-pass/06-variables.js'
// import switchChange from './3rd-pass/06-switchChange.js'
import checkHyphen from './3rd-pass/05-prefixes.js'

const first = {
  multiWord,
  checkLexicon,
}
const second = {
  checkSuffix,
  checkRegex,
  checkCase,
  checkPrefix,
  checkHyphen
}
const third = {
  checkAcronym,
  neighbours,
  orgWords,
  nounFallback,
  variables,
}

// set a preliminary tag for known words
const firstPass = function (terms, model) {
  for (let i = 0; i < terms.length; i += 1) {
    if (terms[i].tags.size === 0) {
      let found = null
      found = found || first.multiWord(terms, i, model)
      // lookup known words
      found = found || first.checkLexicon(terms, i, model)
    }
  }
}

//
// these methods don't care about word-neighbours
const secondPass = function (terms, model) {
  for (let i = 0; i < terms.length; i += 1) {
    //  is it titlecased?
    let found = second.checkCase(terms, i, model)

    if (terms[i].tags.size === 0) {
      // look at word ending
      found = found || second.checkSuffix(terms, i, model)
      // check for stem in lexicon
      found = found || second.checkPrefix(terms, i, model)
      // try look-like rules
      found = found || second.checkRegex(terms, i, model)
    }
  }
}

const thirdPass = function (terms, model) {
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
    third.orgWords(terms, i, model)
    // support 'out-lived'
    second.checkHyphen(terms, i, model)
    // verb-noun disambiguation, etc
    third.variables(terms, i, model)
    // third.switchChange(terms, i, model)
  }
}

const preTagger = function (document, world) {
  const { model } = world
  // roughly split sentences up by clause
  document = world.methods.two.quickSplit(document)
  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // assign known-words
    firstPass(terms, model)
    // guess by the letters
    secondPass(terms, model)
    // guess by the neighbours
    thirdPass(terms, model)
  }
  return document
}

export default preTagger
