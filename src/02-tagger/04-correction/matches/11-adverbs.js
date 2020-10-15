const ambig = require('../_ambig')
const adjectives = `(${ambig.adverbs.adjectives.join('|')})`

let list = [
  // a bit cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // dark green
  { match: `[${adjectives}] #Adjective`, group: 0, tag: 'Adverb', reason: 'dark-green' },
  // kinda sparkly
  { match: `#Adverb [#Adverb]$`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly' },
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
]
module.exports = list
