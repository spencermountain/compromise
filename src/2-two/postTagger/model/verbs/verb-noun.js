export default [
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog runs
  { match: '^(#Determiner|#Possessive) #Adjective+? #Singular #Adverb+? [(runs|walks|barks|swims|sleeps)] #Adverb+?$', hook: '#Singular', group: 0, tag: 'PresentTense', reason: 'singular-subject-predicate' },
  // with heads and arms rolling around
  { match: '#Preposition #Plural and [%Plural|Verb%] #Gerund', hook: 'and', group: 0, tag: 'Plural', reason: 'coordinated-plurals' },
  // he can solve the puzzle
  { match: '#Infinitive (this|that|the) [#Infinitive]', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'do-this-dance' },
  // keeping the matter a secret
  { match: '#Gerund #Determiner [#Infinitive]', hook: '#Gerund', group: 0, tag: 'Noun', reason: 'running-a-show' },
  // the-only-reason
  { match: '#Determiner (only|further|just|more|backward) [#Infinitive]', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'the-only-reason' },
  // the slide makes noise
  { match: '(the|this|a|an) [#Infinitive] #Adverb? #Verb', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'determiner5' },
  // Use a pointed stick (a pencil) or a similar tool
  { match: '#Determiner #Adjective #Adjective? [#Infinitive]', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'a-nice-inf' },
  // the American thank-you letter
  { match: '#Determiner #Demonym [#PresentTense]', hook: '#Demonym', group: 0, tag: 'Noun', reason: 'mexican-train' },
  // the next career read is brief
  { match: '#Adjective #Noun+ [#Infinitive] #Copula', hook: '#Copula', group: 0, tag: 'Noun', reason: 'career-move' },
  // at some thank-you party
  { match: 'at some [#Infinitive]', hook: 'some', group: 0, tag: 'Noun', reason: 'at-some-inf' },
  // goes to sleep
  { match: '(go|goes|went) to [#Infinitive]', hook: 'to', group: 0, tag: 'Noun', reason: 'goes-to-verb' },
  // a dog retrieve in the field
  { match: '(a|an) #Adjective? #Noun [#Infinitive] (#Preposition|#Noun)', hook: '#Infinitive', group: 0, notIf: 'from', tag: 'Noun', reason: 'a-noun-inf' },
  // a software reinstall
  { match: '(a|an) #Noun [#Infinitive]$', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'a-noun-inf2' },
  //is mark hughes
  // { match: '#Copula [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'is-pres-noun' },
  // good wait staff
  // { match: '#Adjective [#Infinitive] #Noun', group: 0, tag: 'Noun', reason: 'good-wait-staff' },
  // working for thank-you letters
  { match: '#Gerund #Adjective? for [#Infinitive]', hook: 'for', group: 0, tag: 'Noun', reason: 'running-for' },
  // running to work
  // { match: '#Gerund #Adjective to [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-to' },
  // about thank-you letters
  { match: 'about [#Infinitive]', hook: 'about', group: 0, tag: 'Singular', reason: 'about-love' },
  // artists on thank-you cards
  { match: '#Plural on [#Infinitive]', hook: 'on', group: 0, tag: 'Noun', reason: 'on-stage' },
  // any thank-you letter
  { match: 'any [#Infinitive]', hook: 'any', group: 0, tag: 'Noun', reason: 'any-charge' },
  // no thank you
  { match: 'no [#Infinitive]', hook: 'no', group: 0, tag: 'Noun', reason: 'no-doubt' },
  // number of thank-yous
  { match: 'number of [#PresentTense]', hook: 'number', group: 0, tag: 'Noun', reason: 'number-of-x' },
  // taught thank-you etiquette
  { match: '(taught|teaches|learns|learned) [#PresentTense]', hook: '#PresentTense', group: 0, tag: 'Noun', reason: 'teaches-x' },
  // use cloned pointers
  { match: '(try|use|attempt|build|make) [#Verb #Particle?]', hook: '#Verb', notIf: '(#Copula|#Noun|sure|fun|up)', group: 0, tag: 'Noun', reason: 'do-verb' },//make sure of
  // append is cloned
  { match: '^[#Infinitive] (is|was)', hook: '#Infinitive', group: 0, tag: 'Noun', reason: 'checkmate-is' },
  // get much thank-you mail
  { match: '#Infinitive much [#Infinitive]', hook: 'much', group: 0, tag: 'Noun', reason: 'get-much' },
  // cause i gotta
  { match: '[cause] #Pronoun #Verb', hook: 'cause', group: 0, tag: 'Conjunction', reason: 'cause-cuz' },
  // the US air force
  { match: 'the #Singular [#Infinitive] (#Noun && !#Possessive)', hook: 'the', group: 0, tag: 'Noun', notIf: '#Pronoun', reason: 'cardio-dance' },

  // that can Bob sent
  { match: '#Determiner #Modal [#Noun]', hook: '#Modal', group: 0, tag: 'PresentTense', reason: 'should-smoke' },
  // this rocks
  { match: 'this [#Plural]', hook: 'this', group: 0, tag: 'PresentTense', notIf: '(#Preposition|#Date)', reason: 'this-verbs' },
  // the thing that runs
  { match: '#Noun that [#Plural]', hook: 'that', group: 0, tag: 'PresentTense', notIf: '(#Preposition|#Pronoun|way)', reason: 'voice-that-rocks' },
  // that leads to
  { match: 'that [#Plural] to', hook: 'that', group: 0, tag: 'PresentTense', notIf: '#Preposition', reason: 'that-leads-to' },
  // let him father a child
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)', hook: '#Singular',
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue',
  },

  // assign all tasks
  { match: '#Verb (all|every|each|most|some|no) [#PresentTense]', hook: '#PresentTense', notIf: '#Modal', group: 0, tag: 'Noun', reason: 'all-presentTense' },  // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // found all upcoming words
  { match: '(had|have|#PastTense) #Adjective [#PresentTense]', hook: '#Adjective', group: 0, tag: 'Noun', notIf: 'better', reason: 'adj-presentTense' },
  // excellent answer spencer
  // { match: '^#Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'start adj-presentTense' },
  // one big thank-you
  { match: '#Value #Adjective [#PresentTense]', hook: '#Value', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'one-big-reason' },
  // found all upcoming words
  { match: '#PastTense #Adjective+ [#PresentTense]', hook: '#PastTense', group: 0, tag: 'Noun', notIf: '(#Copula|better)', reason: 'won-wide-support' },
  // many thanks
  { match: '(many|few|several|couple) [#PresentTense]', hook: '#PresentTense', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'many-poses' },
  // a very big dream
  { match: '#Determiner #Adverb #Adjective [%Noun|Verb%]', hook: '#Adverb', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'very-big-dream' },
  // from start to finish
  { match: 'from #Noun to [%Noun|Verb%]', hook: 'from', group: 0, tag: 'Noun', reason: 'start-to-finish' },
  // for comparison or contrast
  { match: '(for|with|of) #Noun (and|or|not) [%Noun|Verb%]', hook: '#Noun', group: 0, tag: 'Noun', notIf: '#Pronoun', reason: 'for-food-and-gas' },
  // cute little thank-you bags
  { match: '#Adjective #Adjective [#PresentTense]', hook: '#Adjective', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'adorable-little-store' },
  // of basic training
  // { match: '#Preposition #Adjective [#PresentTense]', group: 0, tag: 'Noun', reason: 'of-basic-training' },
  // writing bigger thank-you notes
  { match: '#Gerund #Adverb? #Comparative [#PresentTense]', hook: '#Comparative', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'higher-costs' },

  // Tuesday, gifts and thanks
  { match: '(#Noun && @hasComma) #Noun (and|or) [#PresentTense]', hook: '#PresentTense', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'noun-list' },

  // some thanks for helping
  { match: '(many|any|some|several) [#PresentTense] for', hook: 'for', group: 0, tag: 'Noun', reason: 'any-verbs-for' },
  // to write people thanks for helping
  { match: `to #PresentTense #Noun [#PresentTense] #Preposition`, hook: 'to', group: 0, tag: 'Noun', reason: 'gas-exchange' },
  // waited until release
  {
    match: `#PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]`,
    hook: '#PastTense',
    group: 0,
    tag: 'Noun',
    reason: 'waited-until-release',
  },
  // selling like hot thank-you cards
  { match: `#Gerund like #Adjective? [#PresentTense]`, hook: 'like', group: 0, tag: 'Plural', reason: 'like-hot-cakes' },
  // some nice thank-you notes
  { match: `some #Adjective [#PresentTense]`, hook: 'some', group: 0, tag: 'Noun', reason: 'some-reason' },
  // for some thank-you letters
  { match: `for some [#PresentTense]`, hook: 'some', group: 0, tag: 'Noun', reason: 'for-some-reason' },
  // same kind of shouts
  { match: `(same|some|the|that|a) kind of [#PresentTense]`, hook: 'kind', group: 0, tag: 'Noun', reason: 'some-kind-of' },
  // a type of shout
  { match: `(same|some|the|that|a) type of [#PresentTense]`, hook: 'type', group: 0, tag: 'Noun', reason: 'some-type-of' },
  // looking good in thank-you photos
  { match: `#Gerund #Adjective #Preposition [#PresentTense]`, hook: '#Gerund', group: 0, tag: 'Noun', reason: 'doing-better-for-x' },
  // get better thank-you notes
  { match: `(get|got|have) #Comparative [#PresentTense]`, hook: '#Comparative', group: 0, tag: 'Noun', reason: 'got-better-aim' },
  // whose thanks are appreciated
  { match: 'whose [#PresentTense] #Copula', hook: 'whose', group: 0, tag: 'Noun', reason: 'whos-name-was' },
  // give up on thank-you letters
  { match: `#PhrasalVerb #Particle #Preposition [#PresentTense]`, hook: '#Particle', group: 0, tag: 'Noun', reason: 'given-up-on-x' },
  // there are thank-you notes
  { match: 'there (are|were) #Adjective? [#PresentTense]', hook: 'there', group: 0, tag: 'Plural', reason: 'there-are' },
  // a thousand thanks of gratitude
  { match: '#Value [#PresentTense] of', hook: 'of', group: 0, notIf: '(one|1|#Copula|#Infinitive)', tag: 'Plural', reason: '2-trains' },
  // thanks are appreciated
  { match: '[#PresentTense] (are|were) #Adjective', hook: '#Adjective', group: 0, tag: 'Plural', reason: 'compromises-are-possible' },
  // hope i helped
  { match: '^[(hope|guess|thought|think)] #Pronoun #Verb', hook: '#Pronoun', group: 0, tag: 'Infinitive', reason: 'suppose-i' },
  //pursue its dreams
  // { match: '#PresentTense #Possessive [#PresentTense]', notIf: '#Gerund', group: 0, tag: 'Plural', reason: 'pursue-its-dreams' },
  // its proper functioning
  { match: '#Possessive #Adjective [#Verb]', hook: '#Possessive', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'our-full-support' },
  // tastes good
  { match: '[(tastes|smells)] #Adverb? #Adjective', hook: '#Adjective', group: 0, tag: 'PresentTense', reason: 'tastes-good' },
  // are you playing golf
  // { match: '^are #Pronoun [#Noun]', group: 0, notIf: '(here|there)', tag: 'Verb', reason: 'are-you-x' },
  // she is writing thank-you letters
  // Being introduces a predicate rather than a direct object.
  { match: '#Copula (#Gerund && !being) [#PresentTense] !by?', hook: '#Gerund', group: 0, tag: 'Noun', notIf: 'going', reason: 'ignoring-commute' },
  // the shed
  { match: '#Determiner #Adjective? [(shed|thought|rose|bid|saw|spelt)]', hook: '#Determiner', group: 0, tag: 'Noun', reason: 'noun-past' },

  // 'verb-to'
  // how to watch
  { match: 'how to [%Noun|Verb%]', hook: 'how', group: 0, tag: 'Infinitive', reason: 'how-to-noun' },
  // which boost it
  { match: 'which [%Noun|Verb%] #Noun', hook: 'which', group: 0, tag: 'Infinitive', reason: 'which-boost-it' },
  // asking questions
  { match: '#Gerund [%Plural|Verb%]', hook: '#Gerund', group: 0, tag: 'Plural', reason: 'asking-questions' },
  // ready to stream
  { match: '(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]', hook: 'to', group: 0, tag: 'Infinitive', reason: 'ready-to-noun' },
  // bring to market
  { match: '(bring|went|go|drive|run|bike) to [%Noun|Verb%]', hook: 'to', group: 0, tag: 'Noun', reason: 'bring-to-noun' },
  // can i sleep, would you look
  { match: '#Modal #Noun [%Noun|Verb%]', hook: '#Modal', group: 0, tag: 'Infinitive', reason: 'would-you-look' },
  // is just spam
  { match: '#Copula just [#Infinitive]', hook: 'just', group: 0, tag: 'Noun', reason: 'is-just-spam' },
  // request copies
  { match: '^%Noun|Verb% %Plural|Verb%', hook: '%Plural|Verb%', tag: 'Imperative #Plural', reason: 'request-copies' },
  // homemade pickles and drinks
  { match: '#Adjective #Plural and [%Plural|Verb%]', hook: 'and', group: 0, tag: '#Plural', reason: 'pickles-and-drinks' },
  // the 1968 stand-off
  { match: '#Determiner #Year [#Verb]', hook: '#Year', group: 0, tag: 'Noun', reason: 'the-1968-film' },
  // the break up
  { match: '#Determiner [#PhrasalVerb #Particle]', hook: '#Particle', group: 0, tag: 'Noun', reason: 'the-break-up' },
  // the individual goals
  { match: '#Determiner [%Adj|Noun%] #Noun', hook: '#Determiner', group: 0, tag: 'Adjective', notIf: '(#Pronoun|#Possessive|#ProperNoun)', reason: 'the-individual-goals' },
  // work or prepare
  { match: '[%Noun|Verb%] or #Infinitive', hook: 'or', group: 0, tag: 'Infinitive', reason: 'work-or-prepare' },
  // to give thanks
  { match: 'to #Infinitive [#PresentTense]', hook: 'to', group: 0, tag: 'Noun', notIf: '(#Gerund|#Copula|help)', reason: 'to-give-thanks' },
  // Google me
  { match: '[#Noun] me', hook: 'me', group: 0, tag: 'Verb', reason: 'kills-me' },
  // removes wrinkles
  { match: '%Plural|Verb% %Plural|Verb%', hook: '%Plural|Verb%', tag: '#PresentTense #Plural', reason: 'removes-wrinkles' },
  // i Google the answer
  { match: 'i [#Noun] the #Noun', hook: 'i', group: 0, tag: 'Infinitive', reason: 'i-water-the-plants' },
  // did the engine stop
  {
    match: '(did|does|will) the #Noun [%Noun|Verb%]',
    hook: '%Noun|Verb%',
    group: 0,
    tag: 'Infinitive',
    reason: 'did-the-engine-stop',
  },
  // 40 gallons of water
  {
    match: '#Value #Noun of [%Noun|Verb%]',
    hook: '%Noun|Verb%',
    group: 0,
    tag: 'Noun',
    reason: '40-gallons-of-water',
  },
  // When the rain stops, we will leave. Whenever the bell rings, the dog barks.
  // when the dog looks
  ...['stops', 'looks', 'rings'].map(word => ({
    match: `(when|whenever|before|after|until|since|as|while|than) (#Determiner|#Possessive) #Adjective+? #Noun [(%Plural|Verb% && ${word})]$`,
    hook: word,
    group: 0,
    tag: 'PresentTense',
    reason: 'as-the-rain-stops',
  })),
  // The sun rose. The river rose quickly.
  { match: '(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adverb+?$', hook: 'rose', group: 0, tag: 'PastTense', reason: 'sun-rose' },
  // The cat woke. Before the dog and the cat woke, she left.
  { match: '(#Noun && !#Possessive) [woke] #Adverb+?$', hook: 'woke', group: 0, tag: 'PastTense', reason: 'cat-woke' },
]
