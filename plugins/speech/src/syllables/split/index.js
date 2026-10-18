import findCuts from './find-cuts/index.js'
import { applyCuts, normalize, pushCutsBack } from './_lib.js'

// Pass the original term text through; the tokenizer owns pre/post punctuation.
const splitTerm = (term, options = {}) => {
  if (!term.text) {
    return []
  }
  let str = term.text
  if (options.normalize) {
    str = term.normal || term.text
  }
  // we can split on a normalized string
  const { clean, prefix } = normalize(str)
  let cuts = findCuts(clean)
  if (prefix && prefix.length > 0) {
    cuts = pushCutsBack(cuts, prefix)
  }
  return applyCuts(term.text, cuts)
}

export default splitTerm
