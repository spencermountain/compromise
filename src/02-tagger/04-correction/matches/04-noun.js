module.exports = [
  // ==== Plural ====
  //there are reasons
  { match: 'there (are|were) #Adjective? [#PresentTense]', group: 0, tag: 'Plural', reason: 'there-are' },

  // ==== Singular ====
  //the sun
  { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'the-sun' },
  //did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]', group: 0, tag: 'Singular', reason: 'did-a-value' },
  //'the can'
  { match: 'the [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },
  // ==== Possessive ====
  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },
  // assign all tasks
  {
    match: '(#Verb && !#Modal) (all|every|each|most|some|no) [#PresentTense]',
    group: 0,
    tag: 'Noun',
    reason: 'all-presentTense',
  },

  //the above is clear
  { match: '#Determiner [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'the-adj-is' },
  //real evil is
  { match: '#Adjective [#Adjective] #Copula', group: 0, tag: 'Noun', reason: 'adj-adj-is' },

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
  // good wait staff
  { match: '#Adjective [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'good-wait-staff' },
  // adorable little store
  { match: '#Adjective #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'adorable-little-store' },
  // of basic training
  { match: '#Preposition #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'of-basic-training' },
  // early warning
  { match: '#Adjective [#Gerund]', group: 0, tag: 'Noun', reason: 'early-warning' },
  // justifiying higher costs
  { match: '#Gerund #Adverb? #Comparative [#PresentTense]', group: 0, tag: 'Noun', reason: 'higher-costs' },
  // do the dance
  { match: '#Infinitive (this|that|the) [#Infinitive]', group: 0, tag: 'Noun', reason: 'do-this-dance' },

  //his fine
  { match: '(his|her|its) [#Adjective]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', group: 0, tag: 'Noun', reason: 'noun-list' }, //3 feet
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' }, // a bit
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },
  // my first thought
  { match: '#Possessive #Ordinal [#PastTense]', group: 0, tag: 'Noun', reason: 'first-thought' },

  //running-a-show
  { match: '#Gerund #Determiner [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-a-show' },
  //the-only-reason
  { match: '#Determiner #Adverb [#Infinitive]', group: 0, tag: 'Noun', reason: 'the-reason' },
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
  //a nice deal
  { match: '#Determiner #Adjective #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'a-nice-inf' },
  //the wait to vote
  { match: 'the [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //next career move
  { match: '#Adjective #Noun+ [#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'career-move' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', reason: 'noun-of-noun' },
  //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },

  //her polling
  { match: '#Possessive [#Gerund]', group: 0, tag: 'Noun', reason: 'her-polling' },
  //her fines
  { match: '(his|her|its) [#PresentTense]', group: 0, tag: 'Noun', reason: 'its-polling' },

  //linear algebra
  {
    match: '(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'technical-noun',
  },
  // a blown motor
  { match: '(the|those|these|a|an) [#Participle] #Noun', group: 0, tag: 'Adjective', reason: 'blown-motor' },
  // walk the walk
  { match: '(the|those|these|a|an) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these|a|an) #Adjective? [#PresentTense]', group: 0, tag: 'Noun', reason: 'det-pres' },
  { match: '(the|those|these|a|an) #Adjective? [#PastTense]', group: 0, tag: 'Noun', reason: 'det-past' },

  // this swimming
  { match: '(this|that) [#Gerund]', group: 0, tag: 'Noun', reason: 'this-gerund' },
  // at some point
  { match: 'at some [#Infinitive]', group: 0, tag: 'Noun', reason: 'at-some-inf' },

  //air-flow
  { match: '(#Noun && @hasHyphen) #Verb', tag: 'Noun', reason: 'hyphen-verb' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //different views than
  { match: '[#Verb] than', group: 0, tag: 'Noun', reason: 'correction' },
  // goes to sleep
  { match: '(go|goes|went) to [#Infinitive]', group: 0, tag: 'Noun', reason: 'goes-to-verb' },
  //a great run
  // { match: '(a|an) #Adjective [(#Infinitive|#PresentTense)]', tag: 'Noun', reason: 'a|an2' },
  //a tv show
  { match: '(a|an) #Noun [#Infinitive]', group: 0, tag: 'Noun', reason: 'a-noun-inf' },
  //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },
  //is mark hughes
  { match: '#Copula [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'is-pres-noun' },
  //
  // { match: '[#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'inf-copula' },
  //a close
  { match: '#Determiner #Adverb? [close]', group: 0, tag: 'Adjective', reason: 'a-close' },
  // what the hell
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // the staff were
  { match: '(the|these) [#Singular] (were|are)', group: 0, tag: 'Plural', reason: 'singular-were' },
  // running for congress
  { match: '#Gerund #Adjective? for [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-for' },
  // running to work
  { match: '#Gerund #Adjective to [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-to' },
  // any questions for
  { match: '(many|any|some|several) [#PresentTense] for', group: 0, tag: 'Noun', reason: 'any-verbs-for' },
  // have fun
  { match: `(have|had) [#Adjective] #Preposition .`, group: 0, tag: 'Noun', reason: 'have-fun' },
  // co-founder
  { match: `co #Noun`, tag: 'Actor', reason: 'co-noun' },
]
