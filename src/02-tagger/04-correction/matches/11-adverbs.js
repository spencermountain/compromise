// const ambig = require('../_ambig')
// const adjectives = `(${ambig.adverbs.adjectives.join('|')})`

let list = [
  // a bit cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
]
module.exports = list
