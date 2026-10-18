import findCuts from './find-cuts/index.js'
import { applyCuts } from './_lib.js'

// Pass the original term text through; the tokenizer owns pre/post punctuation.
const splitTerm = term => {
  if (!term.text) {
    return []
  }
  if (term.tags.has('Acronym')) {
    return term.text.split('')
  }
  const cuts = findCuts(term.text)
  console.log(cuts)
  return applyCuts(term.text, cuts)
}

export default splitTerm
