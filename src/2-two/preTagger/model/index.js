import tagSet from './tagSet/index.js'
import irregularPlurals from './irregulars/plurals.js'
import irregularVerbs from './irregulars/conjugations.js'
import { lexicon, variables } from './lexicon/index.js'
import clues from './clues/index.js'
import suffixPatterns from './patterns/suffixes.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'

import regexNormal from './regex/regex-normal.js'
import regexText from './regex/regex-text.js'
import regexNumbers from './regex/regex-numbers.js'
import orgWords from './orgWords.js'

import expandLexicon from './_expand/index.js'

const model = {
  irregularPlurals,
  irregularVerbs,
  tagSet,

  suffixPatterns,
  endsWith,
  neighbours,

  regexNormal,
  regexText,
  regexNumbers,

  lexicon,
  variables,
  clues,

  uncountable: {},

  orgWords,

  _multiCache: {},
}

export default {
  two: expandLexicon(model),
}

// console.log(model.lexicon.thought)