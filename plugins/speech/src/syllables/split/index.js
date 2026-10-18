import findCuts from './find-cuts.js'
import { applyCuts } from './_lib.js'

// Pass the original term text through; the tokenizer owns pre/post punctuation.
const splitTerm = term => {
  if (!term.text) {
    return []
  }
  const cuts = findCuts(term.text)
  console.log(cuts)
  return applyCuts(term.text, cuts)
}

export default splitTerm
