import tags from './tags/index.js'
import irregularPlurals from './irregulars/plurals.js'
import irregularVerbs from './irregulars/conjugations.js'
import lexicon from './lexicon/index.js'
import suffixPatterns from './patterns/suffixes.js'
import regexNormal from './patterns/regex-normal.js'
import regexText from './patterns/regex-text.js'
import regexFallback from './patterns/regex-fallback.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'

export default {
  lexicon,
  two: {
    tags,
    irregularPlurals,
    irregularVerbs,
    suffixPatterns,
    regexNormal,
    regexText,
    regexFallback,
    endsWith,
    neighbours,
    _multiCache: new Set(),
  },
}
