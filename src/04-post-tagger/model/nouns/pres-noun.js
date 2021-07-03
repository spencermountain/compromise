export default [
  // assign all tasks
  {
    match: '(#Verb && !#Modal) (all|every|each|most|some|no) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'all-presentTense',
  },
  // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // have big dreams
  { match: '(had|have|#PastTense) #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adj-presentTense' },
  // excellent answer spencer
  { match: '^#Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'start adj-presentTense' },
  // one big reason
  { match: '#Value #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'one-big-reason' },
  // won widespread support
  { match: '#PastTense #Adjective+ [#PresentTense]', group: 0, tag: 'Noun', reason: 'won-wide-support' },
  // many poses
  { match: '(many|few|several|couple) [#PresentTense]', group: 0, tag: 'Noun', reason: 'many-poses' },
  // very big dreams
  { match: '#Adverb #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'very-big-dream' },
  // adorable little store
  { match: '#Adjective #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adorable-little-store' },
  // of basic training
  { match: '#Preposition #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'of-basic-training' },
  // justifiying higher costs
  { match: '#Gerund #Adverb? #Comparative [#PresentTense]', group: 0, tag: 'Noun', reason: 'higher-costs' },

  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', group: 0, tag: 'Noun', reason: 'noun-list' },
  //her fines
  { match: '(his|her|its) [#PresentTense]', group: 0, tag: 'Noun', reason: 'its-polling' },
  // any questions for
  { match: '(many|any|some|several) [#PresentTense] for', group: 0, tag: 'Noun', reason: 'any-verbs-for' },
  // to facilitate gas exchange with
  { match: `to #PresentTense #Noun [#PresentTense] #Preposition`, group: 0, tag: 'Noun', reason: 'gas-exchange' },
  // waited until release
  {
    match: `#PastTense (until|as|through|without) [#PresentTense]`,
    group: 0,
    tag: 'Noun',
    reason: 'waited-until-release',
  },
  // selling like hot cakes
  { match: `#Gerund like #Adjective? [#PresentTense]`, group: 0, tag: 'Plural', reason: 'like-hot-cakes' },
  // some valid reason
  { match: `some #Adjective [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-reason' },
  // for some reason
  { match: `for some [#PresentTense]`, group: 0, tag: 'Noun', reason: 'for-some-reason' },
  // same kind of shouts
  { match: `(same|some|the|that|a) kind of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-kind-of' },
  // a type of shout
  { match: `(same|some|the|that|a) type of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-type-of' },
  // doing better for fights
  { match: `#Gerund #Adjective #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'doing-better-for-x' },
  // get better aim
  { match: `(get|got|have|had) #Comparative [#PresentTense]`, group: 0, tag: 'Noun', reason: 'got-better-aim' },
  // whose name was
  { match: 'whose [#PresentTense] #Copula', group: 0, tag: 'Noun', reason: 'whos-name-was' },
  // give up on reason
  { match: `#PhrasalVerb #PhrasalVerb #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'given-up-on-x' },
  //there are reasons
  { match: 'there (are|were) #Adjective? [#PresentTense]', group: 0, tag: 'Plural', reason: 'there-are' },

  // 30 trains
  { match: '(#Value && !1 && !one) [#PresentTense]', group: 0, ifNo: ['#Copula'], tag: 'Plural', reason: '2-trains' },
]
