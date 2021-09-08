export default [
  // operating system
  { match: `[#Gerund] system`, group: 0, tag: 'Noun', reason: 'operating-system' },
  // this swimming
  { match: '(this|that|the) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // i think tipping sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  // /her polling
  { match: '#Possessive [#Gerund]', group: 0, tag: 'Noun', reason: 'her-polling' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },
  // finish listening
  // { match: '#Infinitive [#Gerund]', group: 0, tag: 'Activity', reason: 'finish-listening' },
]
