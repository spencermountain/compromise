// Gerund-Adjectives - 'amusing, annoying'
export default [
  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //as amusing as
  { match: 'as [#Gerund] as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more amusing than
  { match: 'more [#Gerund] than', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // very amusing
  { match: '(so|very|extremely) [#Gerund]', group: 0, tag: 'Adjective', reason: 'so-gerund' },
  // found it amusing
  { match: '(found|found) it #Adverb? [#Gerund]', group: 0, tag: 'Adjective', reason: 'found-it-gerund' },
  // a bit amusing
  { match: 'a (little|bit|wee) bit? [#Gerund]', group: 0, tag: 'Adjective', reason: 'a-bit-gerund' },
  // looking annoying
  { match: '#Gerund [#Gerund]', group: 0, tag: 'Adjective', notIf: '(impersonating|practicing|considering|assuming)', reason: 'looking-annoying' },
]
