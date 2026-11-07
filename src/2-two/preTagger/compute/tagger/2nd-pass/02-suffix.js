import fastTag from '../_fastTag.js'
import findAffix from '../../../methods/_lib.js'
import { Prop, Last } from '../../../tagSet/_lib.js'

//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const suffix = findAffix(str, suffixes, Math.min(str.length - 1, 7), 2)
  if (suffix === null) {
    return null
  }
  return suffixes[suffix.length][suffix]
}

// decide tag from the ending of the word
const tagBySuffix = function (terms, i, model) {
  const term = terms[i]
  if (term.tags.size === 0) {
    let tag = suffixLoop(term.normal, model.two.suffixPatterns)
    if (tag !== null) {
      fastTag(term, tag, '2-suffix')
      term.confidence = 0.7
      return true
    }
    // try implicit form of word, too
    if (term.implicit) {
      tag = suffixLoop(term.implicit, model.two.suffixPatterns)
      if (tag !== null) {
        fastTag(term, tag, '2-implicit-suffix')
        term.confidence = 0.7
        return true
      }
    }
    // Infinitive suffix + 's' can be PresentTense
    // if (term.normal[term.normal.length - 1] === 's') {
    //   let str = term.normal.replace(/s$/, '')
    //   if (suffixLoop(str, model.two.suffixPatterns) === 'Infinitive') {
    //     console.log(str)
    //     fastTag(term, 'PresentTense', '2-implied-present')
    //     term.confidence = 0.5
    //     return true
    //   }
    // }
  }
  // titlecase surnames - 'Novakovic'
  const str = term.machine || term.normal
  if (term.tags.size === 1 && term.tags.has(Prop) && !Object.hasOwn(model.one.lexicon, str)) {
    if (suffixLoop(str, model.two.suffixPatterns) === Last) {
      fastTag(term, Last, '2-suffix-lastname')
      return true
    }
  }
  return null
}
export default tagBySuffix
