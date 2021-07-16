import tags from './tags/index.js'
import irregularPlurals from './irregulars/plurals.js'
import irregularVerbs from './irregulars/conjugations.js'
import lexicon from './lexicon/index.js'
import suffixPatterns from './patterns/suffixes.js'
import regexNormal from './patterns/regex-normal.js'
import regexText from './patterns/regex-text.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'

export default {
  tags,
  irregularPlurals,
  irregularVerbs,
  lexicon,
  suffixPatterns,
  regexNormal,
  regexText,
  endsWith,
  neighbours,
  _multiCache: new Set(),
}
