export default [
  //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb',
  },
  //i better ..
  { match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', group: 0, tag: 'Modal', reason: 'i-better' },
  // adj -> gerund
  // like
  { match: '(#Modal|i|they|we|do) not? [like]', group: 0, tag: 'PresentTense', reason: 'modal-like' },
  // do not simply like
  {
    match: 'do (simply|just|really|not)+ [(#Adjective|like)]',
    group: 0,
    tag: 'Verb',
    reason: 'do-simply-like',
  },
  // ==== Tense ====
  //he left
  { match: '#Noun #Adverb? [left]', group: 0, tag: 'PastTense', reason: 'left-verb' },

  // ==== Copula ====
  //will be running (not copula)
  { match: 'will #Adverb? not? #Adverb? [be] #Gerund', group: 0, tag: 'Copula', reason: 'will-be-copula' },
  //for more complex forms, just tag 'be'
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', group: 0, tag: 'Copula', reason: 'be-copula' },
  // ==== Infinitive ====
  //march to
  { match: '[march] (up|down|back|to|toward)', group: 0, tag: 'Infinitive', reason: 'march-to' },
  //must march
  { match: '#Modal [march]', group: 0, tag: 'Infinitive', reason: 'must-march' },
  // may be
  { match: `[may] be`, group: 0, tag: 'Verb', reason: 'may-be' },

  // === misc==
  // open the door
  { match: '[open] #Determiner', group: 0, tag: 'Infinitive', reason: 'open-the' },
  //were being run
  { match: `(were|was) being [#PresentTense]`, group: 0, tag: 'PastTense', reason: 'was-being' },
  //were being run
  { match: `(had|has) [been #Adjective]`, group: 0, tag: 'Auxiliary Verb', reason: 'had-been-adj' },

  // damn them
  { match: '[shit] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear1-verb' },
  { match: '[damn] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear2-verb' },
  { match: '[fuck] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear3-verb' },
]
