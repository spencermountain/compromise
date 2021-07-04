export default [
  // operating system
  { match: `[#Gerund] system`, group: 0, tag: 'Noun', reason: 'operating-system' },
  // this swimming
  { match: '(this|that) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // i think tipping sucks
  { match: `#Pronoun #Infinitive [#Gerund] #PresentTense`, group: 0, tag: 'Noun', reason: 'tipping-sucks' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  // /her polling
  { match: '#Possessive [#Gerund]', group: 0, tag: 'Noun', reason: 'her-polling' },
]
