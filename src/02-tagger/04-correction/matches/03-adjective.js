const ambig = require('../_ambig')
const adjectives = `(${ambig.person.adjectives.join('|')})`

let list = [
  // all fell apart
  { match: '[all] #Determiner? #Noun', group: 0, tag: 'Adjective', reason: 'all-noun' },
  // very rusty
  { match: `#Adverb [${adjectives}]`, group: 0, tag: 'Adjective', reason: 'really-rich' },
  // rusty smith
  { match: `${adjectives} #Person`, tag: 'Person', reason: 'randy-smith' },
  // rusty a. smith
  { match: `${adjectives} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rusty-smith' },
  //sometimes not-adverbs
  { match: '#Copula [(just|alone)]$', group: 0, tag: 'Adjective', reason: 'not-adverb' },
  //jack is guarded
  { match: '#Singular is #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'is-filled' },
  // smoked poutine is
  { match: '[#PastTense] #Singular is', group: 0, tag: 'Adjective', reason: 'smoked-poutine' },
  // baked onions are
  { match: '[#PastTense] #Plural are', group: 0, tag: 'Adjective', reason: 'baked-onions' },

  // is f*ed up
  { match: '#Copula [fucked up?]', tag: 'Adjective', reason: 'swears-adjective' },
  //jack seems guarded
  { match: '#Singular (seems|appears) #Adverb? [#PastTense$]', group: 0, tag: 'Adjective', reason: 'seems-filled' },

  // Gerund-Adjectives - 'amusing, annoying'
  //a staggering cost
  { match: '(a|an) [#Gerund]', group: 0, tag: 'Adjective', reason: 'a|an' },
  //as amusing as
  { match: 'as [#Gerund] as', group: 0, tag: 'Adjective', reason: 'as-gerund-as' },
  // more amusing than
  { match: 'more [#Gerund] than', group: 0, tag: 'Adjective', reason: 'more-gerund-than' },
  // was amusing
  { match: '#Copula (so|very|extremely) [#Gerund]', group: 0, tag: 'Adjective', reason: 'was-so-gerund' },
]

module.exports = list
