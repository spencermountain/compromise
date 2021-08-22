// order matters
let matches = [
  // u r cool
  { match: 'u r', tag: '#Pronoun #Copula', reason: 'u r' },
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' },

  // ==== Conditions ====
  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  //swear-words as non-expression POS
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  // well..
  { match: '^(well|so|okay)', tag: 'Expression', reason: 'well-' },
]
export default matches
