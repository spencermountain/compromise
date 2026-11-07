import fastTag from '../_fastTag.js'
import { Prop, Last } from '../../../tagSet/_lib.js'

//sweep-through all suffixes
const suffixLoop = function (str = '', suffixes = []) {
  const len = str.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i > 1; i -= 1) {
    const suffix = str.substring(len - i, len)
    if (Object.hasOwn(suffixes[suffix.length], suffix) === true) {
      // console.log(suffix)
      const tag = suffixes[suffix.length][suffix]
      return tag
    }
  }
  return null
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
