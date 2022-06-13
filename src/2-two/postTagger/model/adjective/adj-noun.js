export default [
  //the above is clear
  { match: '#Determiner [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'the-adj-is' },
  //real evil is
  { match: '#Adjective [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'adj-adj-is' },
  //his fine
  { match: '(his|its) [%Adj|Noun%]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //is all
  { match: '#Copula #Adverb? [all]', group: 0, tag: 'Noun', reason: 'is-all' },
  // have fun
  { match: `(have|had) [#Adjective] #Preposition .`, group: 0, tag: 'Noun', reason: 'have-fun' },
  // brewing giant
  { match: `#Gerund (giant|capital|center|zone|application)`, tag: 'Noun', reason: 'brewing-giant' },
  // in an instant
  { match: `#Preposition (a|an) [#Adjective]$`, group: 0, tag: 'Noun', reason: 'an-instant' },
]
