const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
export default [
  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' },
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },

  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  // my first thought
  { match: '#Possessive #Ordinal [#PastTense]', group: 0, tag: 'Noun', reason: 'first-thought' },
  //the nice swim
  { match: '(the|this|those|these) #Adjective [%Verb|Noun%]', group: 0, tag: 'Noun', ifNo: '#Copula', reason: 'the-adj-verb' },
  // the truly nice swim
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'determiner4' },
  //the wait to vote
  { match: 'the [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', ifNo: '#Gerund', reason: 'noun-of-noun' },
  // ended in ruins
  { match: '#PastTense #Preposition [#PresentTense]', group: 0, ifNo: ['#Gerund'], tag: 'Noun', reason: 'ended-in-ruins' },
  //'u' as pronoun
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' },
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },
  //the western line
  { match: '#Determiner [(western|eastern|northern|southern|central)] #Noun', group: 0, tag: 'Noun', reason: 'western-line' },
  //air-flow
  { match: '(#Singular && @hasHyphen) #PresentTense', tag: 'Noun', reason: 'hyphen-verb' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },
  // what the hell
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // go to shit
  { match: 'to [(shit|hell)]', group: 0, tag: 'Noun', reason: 'to-swears' },
  // the staff were
  { match: '(the|these) [#Singular] (were|are)', group: 0, tag: 'Plural', reason: 'singular-were' },
  // a comdominium, or simply condo
  { match: `a #Noun+ or #Adverb+? [#Verb]`, group: 0, tag: 'Noun', reason: 'noun-or-noun' },
  // walk the walk
  { match: '(the|those|these|a|an) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these|a|an) #Adjective? [#PresentTense]', ifNo: ['#Gerund', '#Copula'], group: 0, tag: 'Noun', reason: 'det-pres' },

  // ==== Actor ====
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },
  // co-founder
  { match: `co #Singular`, tag: 'Actor', reason: 'co-noun' },

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
  // 10th of a second
  { match: '#Value of a [second]', group: 0, unTag: 'Value', tag: 'Singular', reason: '10th-of-a-second' },
  // 10 seconds
  { match: '#Value [seconds]', group: 0, unTag: 'Value', tag: 'Plural', reason: '10-seconds' },
  // in time
  { match: 'in [#Infinitive]', group: 0, tag: 'Singular', reason: 'in-age' },
  // a minor in
  { match: 'a [#Adjective] #Preposition', group: 0, tag: 'Noun', reason: 'a-minor-in' },
  //the repairer said
  { match: '#Determiner [#Singular] said', group: 0, tag: 'Actor', reason: 'the-actor-said' },
  //the euro sense
  { match: `#Determiner #Noun [${infNouns}] !(#Preposition|to|#Adverb)?`, group: 0, tag: 'Noun', reason: 'the-noun-sense' },
  // photographs of a computer are
  { match: '[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula', group: 0, tag: 'Plural', reason: 'photographs-of' },
  // fight and win
  { match: '#Infinitive and [%Noun|Verb%]', group: 0, tag: 'Infinitive', reason: 'fight and win' },
  // bride and groom
  { match: '#Noun and [%Noun|Verb%]', group: 0, tag: 'Singular', ifNo: ['#ProperNoun'], reason: 'bride-and-groom' },
  // peace and flowers and love
  { match: '#Noun and [#Verb] and #Noun', group: 0, tag: 'Noun', reason: 'peace-and-flowers' },
  // the 1992 classic
  { match: 'the #Cardinal [%Adj|Noun%]', group: 0, tag: 'Noun', reason: 'the-1992-classic' },
  // the premier university
  { match: '#Copula the [%Adj|Noun%] #Noun', group: 0, tag: 'Adjective', reason: 'the-premier-university' },
]
