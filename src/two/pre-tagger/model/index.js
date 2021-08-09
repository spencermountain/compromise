import tags from './tags/index.js'
import irregularPlurals from './irregulars/plurals.js'
import irregularVerbs from './irregulars/conjugations.js'
import lexicon from './lexicon/index.js'
import suffixPatterns from './patterns/suffixes.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'

import regexNormal from './regex/regex-normal.js'
import regexText from './regex/regex-text.js'
import regexFallback from './regex/regex-fallback.js'

export default {
  lexicon,
  two: {
    tags,
    irregularPlurals,
    irregularVerbs,
    suffixPatterns,
    endsWith,
    neighbours,

    regexNormal,
    regexText,
    regexFallback,

    _multiCache: new Set(),
  },
}
