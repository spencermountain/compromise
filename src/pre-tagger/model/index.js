import tags from './tags/index.js'
import irregularPlurals from './irregulars/plurals.js'
import irregularConjugations from './irregulars/conjugations.js'
import lexicon from './lexicon/index.js'
import suffixPatterns from './patterns/suffixes.js'
import regex from './patterns/regex.js'
import endsWith from './patterns/endsWith.js'
import neighbours from './patterns/neighbours.js'
export default {
  tags,
  irregularPlurals,
  irregularConjugations,
  lexicon,
  suffixPatterns,
  regex,
  endsWith,
  neighbours,
  _multiCache: new Set(),
}
