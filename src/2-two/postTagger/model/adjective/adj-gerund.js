export default [
  // Gerund-Adjectives - 'amusing, annoying'
  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //as amusing as
  { match: 'as [#Gerund] as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more amusing than
  { match: 'more [#Gerund] than', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // very amusing
  { match: '(so|very|extremely) [#Gerund]', group: 0, tag: 'Adjective', reason: 'so-gerund' },
  // it was amusing
  // {
  //   match: '(it|he|she|everything|something) #Adverb? was #Adverb? [#Gerund]',
  //   group: 0,
  //   tag: 'Adjective',
  //   reason: 'it-was-gerund',
  // },
  // found it amusing
  { match: '(found|found) it #Adverb? [#Gerund]', group: 0, tag: 'Adjective', reason: 'found-it-gerund' },
  // a bit amusing
  { match: 'a (little|bit|wee) bit? [#Gerund]', group: 0, tag: 'Adjective', reason: 'a-bit-gerund' },
  // the amusing world
  { match: '(#Determiner|#Possessive) [#Gerund] #Noun', group: 0, tag: 'Adjective', reason: 'amusing-world' },
]
