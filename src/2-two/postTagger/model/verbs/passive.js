// ==== Passive voice ===
export default [
  // got walked, was walked, were walked
  { match: 'got (#PastTense|#Participle)', hook: 'got', tag: 'Passive', reason: 'got-walked' },
  { match: 'were (#PastTense|#Participle)', hook: 'were', tag: 'Passive', reason: 'got-walked' },
  { match: 'was (#PastTense|#Participle)', hook: 'was', tag: 'Passive', reason: 'got-walked' },
  { match: 'is (#PastTense|#Participle)', hook: 'is', tag: 'Passive', reason: 'got-walked' },
  { match: 'are (#PastTense|#Participle)', hook: 'are', tag: 'Passive', reason: 'got-walked' },
  { match: 'am (#PastTense|#Participle)', hook: 'am', tag: 'Passive', reason: 'got-walked' },
  // was being walked
  { match: '(was|were|is|are|am) being (#PastTense|#Participle)', hook: 'being', tag: 'Passive', reason: 'was-being' },
  // had been walked, have been eaten
  { match: '(had|have|has) been (#PastTense|#Participle)', hook: 'been', tag: 'Passive', reason: 'had-been' },
  // will be cleaned
  { match: 'will be being? (#PastTense|#Participle)', hook: 'will', tag: 'Passive', reason: 'will-be-cleaned' },
  // suffered by the country
  { match: '#Noun [(#PastTense|#Participle)] by (the|a) #Noun', hook: 'by', group: 0, tag: 'Passive', reason: 'suffered-by' },

]