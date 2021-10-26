export default [
  // operating system
  { match: `[#Gerund] system`, group: 0, tag: 'Noun', reason: 'operating-system' },
  { match: '(this|that|the) [#Gerund #Infinitive]', group: 0, tag: 'Singular', reason: 'the-planning-process' },
  // the planning processes
  { match: '(that|the) [#Gerund #PresentTense]', group: 0, tag: 'Plural', reason: 'the-paving-stones' },
  // this swimming
  { match: '(this|that|the) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // i think tipping sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  // /her polling number
  // { match: '#Possessive [#Gerund] #Noun', group: 0, tag: 'Noun', reason: 'her-polling' },
  //her fines
  // { match: '#Possessive [#PresentTense]', group: 0, tag: 'Noun', reason: 'its-polling' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  // finish listening
  // { match: '#Infinitive [#Gerund]', group: 0, tag: 'Activity', reason: 'finish-listening' },
]
