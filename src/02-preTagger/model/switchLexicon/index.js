import words from './_words.js'
import { unpack } from 'efrt'
// unpack our lexicon of ambiguous-words
// (found in ./lib/borderline/)

let switches = {
  NounVerb: new Set(Object.keys(unpack(words.NounVerb))),
}

export default switches
