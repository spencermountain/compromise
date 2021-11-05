export default [
  //the above is clear
  { match: '#Determiner [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'the-adj-is' },
  //real evil is
  { match: '#Adjective [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'adj-adj-is' },
  //his fine
  { match: '(his|her|its) [#Adjective]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //is all
  { match: '#Copula #Adverb? [all]', group: 0, tag: 'Noun', reason: 'is-all' },
  //the orange is
  { match: '#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)', group: 0, tag: 'Noun', reason: 'the-adj-2' },
  // have fun
  { match: `(have|had) [#Adjective] #Preposition .`, group: 0, tag: 'Noun', reason: 'have-fun' },
  // brewing giant
  { match: `#Gerund (giant|capital|center|zone|application)`, tag: 'Noun', reason: 'brewing-giant' },
  // the orange
  // {
  //   match: '#Determiner [#Adjective]$',
  //   ifNo: ['Comparative', 'Superlative', 'much'],
  //   group: 0,
  //   tag: 'Noun',
  //   reason: 'the-orange',
  // },
]
