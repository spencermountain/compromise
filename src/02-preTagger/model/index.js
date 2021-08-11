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

// scounge irregulars for any interesting lexicon-data:
Object.entries(irregularVerbs).forEach(a => {
  let [inf, conj] = a
  lexicon[inf] = lexicon[inf] || 'Infinitive'
  Object.keys(conj).forEach(tag => {
    let word = conj[tag]
    if (word !== '') {
      lexicon[word] = lexicon[word] || tag
    }
  })
})

Object.entries(irregularPlurals).forEach(a => {
  lexicon[a[0]] = lexicon[a[0]] || 'Singular'
  lexicon[a[1]] = lexicon[a[1]] || 'Plural'
})

export default {
  two: {
    lexicon,
    tags,
    irregularPlurals,
    irregularVerbs,
    suffixPatterns,
    endsWith,
    neighbours,

    regexNormal,
    regexText,
    regexFallback,

    _multiCache: {},
  },
}
