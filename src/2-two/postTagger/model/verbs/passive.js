export default [
  // got walked
  { match: 'got (#PastTense|#Participle)', hook: 'got', tag: 'Passive', reason: 'got-passive' },
  // were walked
  { match: 'were (#PastTense|#Participle)', hook: 'were', tag: 'Passive', reason: 'were-passive' },
  // was walked
  { match: 'was (#PastTense|#Participle)', hook: 'was', tag: 'Passive', reason: 'was-passive' },
  // is walked
  { match: 'is (#PastTense|#Participle)', hook: 'is', tag: 'Passive', reason: 'is-passive' },
  // are walked
  { match: 'are (#PastTense|#Participle)', hook: 'are', tag: 'Passive', reason: 'are-passive' },
  // am walked
  { match: 'am (#PastTense|#Participle)', hook: 'am', tag: 'Passive', reason: 'am-passive' },
  // was being walked
  { match: '(was|were|is|are|am) being (#PastTense|#Participle)', hook: 'being', tag: 'Passive', reason: 'being-passive' },
  // had been walked
  { match: '(had|have|has) been (#PastTense|#Participle)', hook: 'been', tag: 'Passive', reason: 'been-passive' },
  // will be cleaned
  { match: 'will be being? (#PastTense|#Participle)', hook: 'will', tag: 'Passive', reason: 'will-be-passive' },
  // dog was [walked] by the man
  { match: '#Noun (am|is|are|was|were) #Adverb? [(#PastTense|#Participle)] by (the|a) #Noun', hook: 'by', group: 0, tag: 'Passive', reason: 'suffered-by' },

]