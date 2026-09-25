export default [
  //sometimes adverbs - 'pretty good','well above'
  // is pretty good
  {
    match: '#Copula [(pretty|dead|full|well|sure)] #Adjective', hook: '#Copula',
    group: 0,
    tag: 'Adverb',
    reason: 'sometimes-adverb',
  },
  // i better go
  { match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', hook: 'better', group: 0, tag: 'Modal', reason: 'i-better' },
  // adj -> gerund
  // i like
  { match: '(#Modal|i|they|we|do) not? [like]', hook: 'like', group: 0, tag: 'PresentTense', reason: 'modal-like' },
  // ==== Tense ====
  // he left
  { match: '#Noun #Adverb? [left]', hook: 'left', group: 0, tag: 'PastTense', reason: 'left-verb' },
  // she bit her tongue - the noun/verb switch assumes an infinitive
  // she bit her tongue
  { match: '#Noun #Adverb? [(bit && #Infinitive)]', hook: 'bit', group: 0, tag: 'PastTense', reason: 'bit-past' },

  // ==== Copula ====
  // will be running
  { match: 'will #Adverb? not? #Adverb? [be] #Gerund', hook: 'will', group: 0, tag: 'Copula', reason: 'will-be-copula' },
  // will be nice
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', hook: 'will', group: 0, tag: 'Copula', reason: 'be-copula' },
  // ==== Infinitive ====
  // march up
  { match: '[march] (up|down|back|toward)', hook: 'march', notIf: '#Date', group: 0, tag: 'Infinitive', reason: 'march-to' },
  // must march
  { match: '#Modal [march]', hook: 'march', group: 0, tag: 'Infinitive', reason: 'must-march' },
  // may be
  { match: `[may] be`, hook: 'may', group: 0, tag: 'Verb', reason: 'may-be' },
  // predicative noun/adjective, not the verbs 'home' and 'subject'
  // birds home to their nest
  { match: '(#Pronoun|#Plural|#Modal) #Adverb+? [home] to', hook: 'home', group: 0, tag: 'Infinitive', reason: 'birds-home-to' },
  // is home to birds
  { match: '(#Copula|be|been|being) #Adverb+? [home] to', hook: 'home', group: 0, tag: 'Noun', reason: 'is-home-to' },
  // is subject to change
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? [subject] to', hook: 'subject', group: 0, tag: 'Adjective', reason: 'is-subject-to' },
  // is subject to
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject [to]', hook: 'subject', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'predicative-to' },
  // is subject to change
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject to [%Noun|Verb%]', hook: 'subject', group: 0, tag: 'Noun', reason: 'predicative-to-noun' },

  // is home to dogs
  { match: '(#Copula|be|been|being) #Adverb+? home [to] #Adjective+? #Noun', hook: 'home', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'home-to-noun' },

  // === misc==
  // side with
  // { match: '[(side|fool|monkey)] with', group: 0, tag: 'Infinitive', reason: 'fool-with' },
  // open the door
  { match: '[open] #Determiner', hook: 'open', group: 0, tag: 'Infinitive', reason: 'open-the' },
  // were being run
  { match: `(were|was) being [#PresentTense]`, hook: 'being', group: 0, tag: 'PastTense', reason: 'was-being' },
  // had been broken
  { match: `(had|has|have) [been (#PastTense && /en$/)]`, hook: 'been', group: 0, tag: 'Auxiliary Participle', reason: 'had-been-broken' },
  // had been smoked
  { match: `(had|has|have) [been (#PastTense && /ed$/)]`, hook: 'been', group: 0, tag: 'Auxiliary PastTense', reason: 'had-been-smoked' },
  // had been eaten
  { match: `(had|has) #Adverb? [been] #Adverb? #PastTense`, hook: 'been', group: 0, tag: 'Auxiliary', reason: 'had-been-adj' },
  // had to Google the answer
  { match: `(had|has) to [#Noun] (#Determiner|#Possessive)`, hook: 'to', group: 0, tag: 'Infinitive', reason: 'had-to-noun' },
  // have read
  { match: `have [#PresentTense]`, hook: 'have', group: 0, tag: 'PastTense', notIf: '(come|gotten)', reason: 'have-read' },
  // does that work
  { match: `(do|does|did|#Modal) (this|that|these|those) [work]`, hook: 'work', group: 0, tag: 'Infinitive', reason: 'does-that-work' },
  // sounds fun
  { match: `[(sound|sounds)] #Adjective`, hook: '#Adjective', group: 0, tag: 'PresentTense', reason: 'sounds-fun' },
  // look good
  { match: `[(look|looks)] #Adjective`, hook: '#Adjective', group: 0, tag: 'PresentTense', reason: 'looks-good' },
  // stops thinking
  { match: `[(start|starts|stop|stops|begin|begins)] #Gerund`, hook: '#Gerund', group: 0, tag: 'Verb', reason: 'starts-thinking' },
  // have read
  { match: `(has|have|had) read`, hook: 'read', tag: 'Auxiliary Participle', reason: 'read-read' },
  // were under paid
  {
    match: `(is|was|were) [(under|over) #PastTense]`, hook: '#PastTense',
    group: 0,
    tag: 'Adverb Adjective',
    reason: 'was-under-cooked',
  },

  // shit them
  { match: '[shit] (#Determiner|#Possessive|them)', hook: 'shit', group: 0, tag: 'Verb', reason: 'swear1-verb' },
  // damn them
  { match: '[damn] (#Determiner|#Possessive|them)', hook: 'damn', group: 0, tag: 'Verb', reason: 'swear2-verb' },
  // fuck them
  { match: '[fuck] (#Determiner|#Possessive|them)', hook: 'fuck', group: 0, tag: 'Verb', reason: 'swear3-verb' },

  // jobs that fit
  { match: '#Plural that %Noun|Verb%', hook: 'that', tag: '. #Preposition #Infinitive', reason: 'jobs-that-work' },
  // works for me
  { match: '[works] for me', hook: 'works', group: 0, tag: 'PresentTense', reason: 'works-for-me' },
  // as we please
  { match: 'as #Pronoun [please]', hook: 'as', group: 0, tag: 'Infinitive', reason: 'as-we-please' },
  // verb-prefixes - 'co write'
  // co write
  { match: '[(co|mis|de|inter|intra|pre|re|un|out|under|over|counter)] #Verb', hook: '#Verb', group: 0, tag: ['Verb', 'Prefix'], notIf: '(#Copula|#PhrasalVerb)', reason: 'co-write' },
  // dressed and left
  { match: '#PastTense and [%Adj|Past%]', hook: 'and', group: 0, tag: 'PastTense', reason: 'dressed-and-left' },
  // melted and fallen
  { match: '[%Adj|Past%] and #PastTense', hook: 'and', group: 0, tag: 'PastTense', reason: 'dressed-and-left' },
  // is he stoked
  { match: '#Copula #Pronoun [%Adj|Past%]', hook: '#Copula', group: 0, tag: 'Adjective', reason: 'is-he-stoked' },
  // to dream of
  { match: 'to [%Noun|Verb%] #Preposition', hook: 'to', group: 0, tag: 'Infinitive', reason: 'to-dream-of' },
  // he read
  { match: '(he|she|it|#Person) [read]', hook: 'read', group: 0, tag: 'PastTense', reason: 'he-read' },
]
