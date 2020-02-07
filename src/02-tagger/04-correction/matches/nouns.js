module.exports = [
  //the nice swim
  { match: '(the|this|those|these) #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'the-adj-verb' },
  // the truly nice swim
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'determiner4' },
  //the orange is
  { match: '#Determiner [#Adjective] (#Copula|#PastTense|#Auxiliary)', group: 0, tag: 'Noun', reason: 'the-adj-2' },
  // a stream runs
  { match: '(the|this|a|an) [#Infinitive] #Adverb? #Verb', group: 0, tag: 'Noun', reason: 'determiner5' },
  //the test string
  { match: '#Determiner [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'determiner7' },
  //by a bear.
  { match: '#Determiner #Adjective [#Infinitive]$', group: 0, tag: 'Noun', reason: 'a-inf' },
  //the wait to vote
  { match: '(the|this) [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', reason: 'noun-of-noun' },
  //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },

  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },
]
