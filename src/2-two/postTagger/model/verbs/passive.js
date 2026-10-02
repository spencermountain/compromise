export default [
  // got walked
  { match: 'got (#PastTense|#Participle)', hook: 'got', tag: 'Passive', reason: 'got-passive' },
  // Share the pattern while keeping cheap word-specific hooks.
  ...['were', 'was', 'is', 'are', 'am'].map(word => ({
    match: `${word} (#PastTense|#Participle)`,
    hook: word,
    tag: 'Passive',
    reason: `${word}-passive`,
  })),
  // was being walked
  { match: '(was|were|is|are|am) being (#PastTense|#Participle)', hook: 'being', tag: 'Passive', reason: 'being-passive' },
  // had been walked
  { match: '(had|have|has) been (#PastTense|#Participle)', hook: 'been', tag: 'Passive', reason: 'been-passive' },
  // will be cleaned
  { match: 'will be being? (#PastTense|#Participle)', hook: 'will', tag: 'Passive', reason: 'will-be-passive' },
  // dog was [walked] by the man
  { match: '#Noun (am|is|are|was|were) #Adverb? [(#PastTense|#Participle)] by (the|a) #Noun', hook: 'by', group: 0, tag: 'Passive', reason: 'suffered-by' },

]
