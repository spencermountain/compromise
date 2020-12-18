const ambig = require('../_ambig')
const adjectives = `(${ambig.adverbAdjective.join('|')})`

module.exports = [
  //still good
  { match: '[still] #Adjective', group: 0, tag: 'Adverb', reason: 'still-advb' },
  //still make
  { match: '[still] #Verb', group: 0, tag: 'Adverb', reason: 'still-verb' },
  // so hot
  { match: '[so] #Adjective', group: 0, tag: 'Adverb', reason: 'so-adv' },
  // way hotter
  { match: '[way] #Comparative', group: 0, tag: 'Adverb', reason: 'way-adj' },
  // way too hot
  { match: '[way] #Adverb #Adjective', group: 0, tag: 'Adverb', reason: 'way-too-adj' },
  // all singing
  { match: '[all] #Verb', group: 0, tag: 'Adverb', reason: 'all-verb' },
  // sing like an angel
  { match: '(#Verb && !#Modal) [like]', group: 0, tag: 'Adverb', reason: 'verb-like' },
  //barely even walk
  { match: '(barely|hardly) even', tag: 'Adverb', reason: 'barely-even' },
  //even held
  { match: '[even] #Verb', group: 0, tag: 'Adverb', reason: 'even-walk' },
  // even left
  { match: 'even left', tag: '#Adverb #Verb', reason: 'even-left' },
  //cheering hard - dropped -ly's
  { match: '#PresentTense [(hard|quick|long|bright|slow)]', group: 0, tag: 'Adverb', reason: 'lazy-ly' },
  // much appreciated
  { match: '[much] #Adjective', group: 0, tag: 'Adverb', reason: 'bit-1' },
  // is well
  { match: '#Copula [#Adverb]$', group: 0, tag: 'Adjective', reason: 'is-well' },
  // a bit cold
  { match: 'a [(little|bit|wee) bit?] #Adjective', group: 0, tag: 'Adverb', reason: 'a-bit-cold' },
  // dark green
  { match: `[${adjectives}] #Adjective`, group: 0, tag: 'Adverb', reason: 'dark-green' },
  // kinda sparkly
  { match: `#Adverb [#Adverb]$`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly' },
  { match: `#Adverb [#Adverb] (and|or|then)`, group: 0, tag: 'Adjective', reason: 'kinda-sparkly-and' },
]
