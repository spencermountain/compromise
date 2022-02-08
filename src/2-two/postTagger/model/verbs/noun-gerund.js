export default [
  // the planning processes
  { match: '(this|that|the|a|an) [#Gerund #Infinitive]', group: 0, tag: 'Singular', reason: 'the-planning-process' },
  // the paving stones
  { match: '(that|the) [#Gerund #PresentTense]', group: 0, tag: 'Plural', reason: 'the-paving-stones' },
  // this swimming
  { match: '(this|that|the) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // i think tipping sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  // finish listening
  // { match: '#Infinitive [#Gerund]', group: 0, tag: 'Activity', reason: 'finish-listening' },
  // the ruling party
]
