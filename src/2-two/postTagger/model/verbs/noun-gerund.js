export default [
  // the [upcoming thank]-you
  { match: '(this|that|the|a|an) [#Gerund #Infinitive]', group: 0, tag: 'Singular', reason: 'the-planning-process' },
  // the [upcoming thank]-you
  { match: '(that|the) [#Gerund #PresentTense]', group: 0, ifNo: '#Copula', tag: 'Plural', reason: 'the-paving-stones' },
  // the [failing] line
  { match: '#Determiner [#Gerund] #Noun', group: 0, tag: 'Adjective', reason: 'the-gerund-noun' },
  // i think [tipping] sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // lexical [tagging]
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', notIf: '(still|even|just)', reason: 'early-warning' },
  // [walking] is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  // are [doing] is
  { match: '#Copula [(#Gerund|#Activity)] #Copula', group: 0, tag: 'Gerund', reason: 'are-doing-is' },
  // [walking] should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  // responsibility for [setting]
  { match: '#Singular for [%Noun|Gerund%]', group: 0, tag: 'Gerund', reason: 'noun-for-gerund' },
  // better for [training]
  { match: '#Comparative (for|at) [%Noun|Gerund%]', group: 0, tag: 'Gerund', reason: 'better-for-gerund' },
  // apologized for [shouting]
  {
    match: '(#PastTense|#PresentTense) for [%Noun|Gerund%]',
    group: 0,
    tag: 'Gerund',
    reason: 'apologize-for-shouting',
  },
  // he reads the [upcoming]
  { match: '#PresentTense the [#Gerund]', group: 0, tag: 'Noun', reason: 'keep-the-touching' },
]
