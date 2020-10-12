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
  { match: '#Determiner [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },
  // ==== Possessive ====
  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },
  // assign all tasks
  { match: '#Verb (all|every|each|most|some|no) [#PresentTense]', group: 0, tag: 'Noun', reason: 'all-presentTense' },
  //big dreams, critical thinking
  { match: '(#Adjective && !all) [#PresentTense]', group: 0, tag: 'Noun', reason: 'adj-presentTense' },
  //his fine
  { match: '(his|her|its) [#Adjective]', group: 0, tag: 'Noun', reason: 'his-fine' },
  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', group: 0, tag: 'Noun', reason: 'noun-list' }, //3 feet
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' }, // a bit
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },

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
  //by a bear.
  { match: '#Determiner #Adjective [#Infinitive]$', group: 0, tag: 'Noun', reason: 'a-inf' },
  //the wait to vote
  { match: '(the|this) [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
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
  // walk the walk
  { match: '(the|those|these) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these) #Adjective? [#PresentTense]', group: 0, tag: 'Noun', reason: 'det-pres' },
  { match: '(the|those|these) #Adjective? [#PastTense]', group: 0, tag: 'Noun', reason: 'det-past' },

  //air-flow
  { match: '(#Noun && @hasHyphen) #Verb', tag: 'Noun', reason: 'hyphen-verb' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //different views than
  { match: '[#Verb] than', group: 0, tag: 'Noun', reason: 'correction' },
  // goes to sleep
  { match: '(go|goes|went) to [#Infinitive]', group: 0, tag: 'Noun', reason: 'goes-to-verb' },
  //a great run
  { match: '(a|an) #Adjective [(#Infinitive|#PresentTense)]', tag: 'Noun', reason: 'a|an2' },
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
]
