export default [
  // the [upcoming thank]-you
  { match: '(this|that|the|a|an) [#Gerund #Infinitive]', group: 0, tag: 'Singular', reason: 'planning' },
  // the [upcoming thank]-you
  { match: '(that|the) [#Gerund #PresentTense]', group: 0, ifNo: '#Copula', tag: 'Plural', reason: 'paving-stones' },
  // the [failing] line
  // left-right: { match: '#Determiner [#Gerund] #Noun', group: 0, tag: 'Adjective', reason: 'ger-noun' },
  // i think [tipping] sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // lexical [tagging]
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', notIf: '(still|even|just)', reason: 'early-warning' },
  // [walking] is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'ger-cop' },
  // are [doing] is
  { match: '#Copula [(#Gerund|#Activity)] #Copula', group: 0, tag: 'Gerund', reason: 'are-doing-is' },
  // [walking] should be fun
  // left-right: { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'ger-modal' },
  // responsibility for [setting]
  { match: '#Singular for [%Noun|Gerund%]', group: 0, tag: 'Gerund', reason: 'noun-for-ger' },
  // better for [training]
  { match: '#Comparative (for|at) [%Noun|Gerund%]', group: 0, tag: 'Gerund', reason: 'better-for-ger' },
  // apologized for [shouting]
  {
    match: '(#PastTense|#PresentTense) for [%Noun|Gerund%]',
    group: 0,
    tag: 'Gerund',
    reason: 'for-shouting',
  },
  // he reads the [upcoming]
  { match: '#PresentTense the [#Gerund]', group: 0, tag: 'Noun', reason: 'touching' },
]
