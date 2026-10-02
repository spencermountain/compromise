export default [
  // is [pretty] good
  {
    match: '#Copula [(pretty|dead|full|well|sure)] #Adjective',
    group: 0,
    tag: 'Adverb',
    reason: 'sometimes-adv',
  },
  // i [better] go
  { match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', group: 0, tag: 'Modal', reason: 'i-better' },
  // adj -> gerund
  // i [like]
  { match: '(#Modal|i|they|we|do) not? [like]', group: 0, tag: 'PresentTense', reason: 'modal-like' },
  // ==== Tense ====
  // he [left]
  { match: '(#Noun && !#Possessive) #Adverb? [left]', group: 0, tag: 'PastTense', reason: 'left-verb' },
  // she [bit] her tongue
  { match: '#Noun #Adverb? [(bit && #Infinitive)]', group: 0, tag: 'PastTense', reason: 'bit-past' },
  // will [be] running
  { match: 'will #Adverb? not? #Adverb? [be] #Gerund', group: 0, tag: 'Copula', reason: 'will-be-cop' },
  // will [be] nice
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', group: 0, tag: 'Copula', reason: 'be-cop' },
  // [march] up
  { match: '[march] (up|down|back|toward)', notIf: '#Date', group: 0, tag: 'Infinitive', reason: 'march-to' },
  // birds [home] to their nest
  { match: '(#Pronoun|#Plural|#Modal) #Adverb+? [home] to', group: 0, tag: 'Infinitive', reason: 'birds-home-to' },
  // is [home] to birds
  { match: '(#Copula|be|been|being) #Adverb+? [home] to', group: 0, tag: 'Noun', reason: 'is-home-to' },
  // is [subject] to change
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? [subject] to', group: 0, tag: 'Adjective', reason: 'is-subj-to' },
  // is subject [to]
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject [to]', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'pred-to' },
  // is subject to [change]
  { match: '(#Copula|be|been|being|remain|remains|remained) #Adverb+? subject to [%Noun|Verb%]', group: 0, tag: 'Noun', reason: 'pred-to-noun' },

  // is home [to] dogs
  { match: '(#Copula|be|been|being) #Adverb+? home [to] #Adjective+? #Noun', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'home-to-noun' },

  // === misc==
  // were being [run]
  { match: `(were|was) being [#PresentTense]`, group: 0, tag: 'PastTense', reason: 'was-being' },
  // had [been broken]
  { match: `(had|has|have) [been (#PastTense && /en$/)]`, group: 0, tag: 'Auxiliary Participle', reason: 'been-broken' },
  // had [been smoked]
  { match: `(had|has|have) [been (#PastTense && /ed$/)]`, group: 0, tag: 'Auxiliary PastTense', reason: 'been-smoked' },
  // had [been] eaten
  { match: `(had|has) #Adverb? [been] #Adverb? #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-been-adj' },
  // had to [Google] the answer
  ...['had', 'has'].map(word => ({
    match: `${word} to [#Noun] (#Determiner|#Possessive)`,
    group: 0, tag: 'Infinitive', reason: 'had-to-noun',
  })),
  // does that [work]
  { match: `(do|does|did|#Modal) (this|that|these|those) [work]`, group: 0, tag: 'Infinitive', reason: 'does-that-work' },
  // have read
  { match: `(has|have|had) read`, tag: 'Auxiliary Participle', reason: 'read-read' },
  // were [under paid]
  ...['under', 'over'].map(word => ({
    match: `(is|was|were) [${word} #PastTense]`,
    group: 0,
    tag: 'Adverb Adjective',
    reason: 'under-cooked',
  })),

  // [shit] them
  { match: '[shit] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'shit-verb' },
  // [damn] them
  { match: '[damn] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'damn-verb' },
  // [fuck] them
  { match: '[fuck] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'fuck-verb' },

  // jobs that fit
  { match: '#Plural that %Noun|Verb%', tag: '. #Preposition #Infinitive', reason: 'jobs-that-work' },
  // [works] for me
  { match: '[works] for me', group: 0, tag: 'PresentTense', reason: 'works-for-me' },
  // as we [please]
  { match: 'as #Pronoun [please]', group: 0, tag: 'Infinitive', reason: 'as-we-please' },
  // verb-prefixes - '[co] write'
  // [co] write
  { match: '[(co|mis|de|inter|intra|pre|re|un|counter)] #Verb', group: 0, tag: ['Verb', 'Prefix'], notIf: '(#Copula|#PhrasalVerb)', reason: 'co-write' },
  // [out] run
  { match: '[(out|under|over)] #Infinitive', group: 0, tag: ['Verb', 'Prefix'], reason: 'dir-verb-pre' },
  // dressed and [left]
  { match: '#PastTense and [%Adj|Past%]', group: 0, tag: 'PastTense', reason: 'past-and-ambig' },
  // [melted] and fallen
  { match: '[(%Adj|Past% && !#Adjective)] and #PastTense', group: 0, tag: 'PastTense', reason: 'ambig-and-past' },
  // is he [stoked]
  { match: '#Copula #Pronoun [%Adj|Past%]', group: 0, tag: 'Adjective', reason: 'is-he-stoked' },
  // to [dream] of
  { match: 'to [%Noun|Verb%] #Preposition', group: 0, tag: 'Infinitive', reason: 'to-dream-of' },
]
