export default [
  // got walked
  { match: 'got (#PastTense|#Participle)', tag: 'Passive', reason: 'got-pass' },
  // Share the pattern while keeping cheap word-specific hooks.
  ...['were', 'was', 'is', 'are', 'am'].map(word => ({
    match: `${word} (#PastTense|#Participle)`,
    tag: 'Passive',
    reason: `${word}-pass`,
  })),
  // was being walked
  { match: '(was|were|is|are|am) being (#PastTense|#Participle)', tag: 'Passive', reason: 'being-pass' },
  // had been walked
  { match: '(had|have|has) been (#PastTense|#Participle)', tag: 'Passive', reason: 'been-pass' },
  // will be cleaned
  { match: 'will be being? (#PastTense|#Participle)', tag: 'Passive', reason: 'will-be-pass' },
  // dog was [walked] by the man
  { match: '#Noun (am|is|are|was|were) #Adverb? [(#PastTense|#Participle)] by (the|a) #Noun', group: 0, tag: 'Passive', reason: 'suffered-by' },

]
