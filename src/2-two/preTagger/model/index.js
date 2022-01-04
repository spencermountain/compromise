import irregularPlurals from './irregulars/plurals.js'
import { lexicon, variables } from './lexicon/index.js'
import clues from './clues/index.js'
import suffixPatterns from './patterns/suffixes.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'
import models from './models/index.js'
import regexNormal from './regex/regex-normal.js'
import regexText from './regex/regex-text.js'
import regexNumbers from './regex/regex-numbers.js'
import orgWords from './orgWords.js'

import expandLexicon from './_expand/index.js'

let model = {
  one: {
    _multiCache: {},
    lexicon,
  },
  two: {
    irregularPlurals,
    models,

    suffixPatterns,
    endsWith,
    neighbours,

    regexNormal,
    regexText,
    regexNumbers,

    variables,
    clues,

    uncountable: {},

    orgWords,
  },

}
model = expandLexicon(model)
export default model

// console.log(model.one.lexicon.see)