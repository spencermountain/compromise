export default [
  // A final button label is an object, not a second verb.
  ...['click', 'clicks', 'selects', 'pick', 'picks'].map(word => ({
    match: `(#Pronoun|#Singular|#Plural) [${word} (submit|save|cancel)]$`,
    group: 0,
    tag: 'PresentTense Noun',
    reason: 'click-button-label',
  })),
  // Common intransitive predicates after a singular subject. Keep arbitrary
  // plural/verb switches conservative: 'the dog treats' is a noun phrase.
  // the dog [runs]
  ...['runs', 'walks', 'barks', 'swims', 'sleeps'].map(word => ({
    match: `^(#Determiner|#Possessive) #Adjective+? #Singular #Adverb+? [${word}] #Adverb+?$`,
    group: 0,
    tag: 'PresentTense',
    reason: 'singular-subject-verb',
  })),
  // with heads and [arms] rolling around
  { match: '#Preposition #Plural and [%Plural|Verb%] #Gerund', group: 0, tag: 'Plural', reason: 'coordinated-plurals' },
  // he can solve the [puzzle]
  { match: '#Infinitive (this|that|the) [#Infinitive]', group: 0, tag: 'Noun', reason: 'do-this-dance' },
  // keeping the [matter] a secret
  { match: '#Gerund #Determiner [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-a-show' },
  // the-only-[reason]
  { match: '#Determiner (only|further|just|more|backward) [#Infinitive]', group: 0, tag: 'Noun', reason: 'the-only-reason' },
  // the [slide] makes noise
  { match: '(the|this|a|an) [#Infinitive] #Adverb? #Verb', group: 0, tag: 'Noun', reason: 'determiner-verb-subject' },
  // Use a pointed [stick] (a pencil) or a similar tool
  { match: '#Determiner #Adjective #Adjective? [#Infinitive]', group: 0, tag: 'Noun', notIf: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)', reason: 'a-nice-inf' },
  // the American [thank]-you letter
  { match: '#Determiner #Demonym [#PresentTense]', group: 0, tag: 'Noun', reason: 'mexican-train' },
  // the next career [read] is brief
  { match: '#Adjective #Noun+ [#Infinitive] #Copula', group: 0, tag: 'Noun', reason: 'career-move' },
  // at some [thank]-you party
  { match: 'at some [#Infinitive]', group: 0, tag: 'Noun', reason: 'at-some-inf' },
  // goes [to sleep]
  { match: '(go|goes|went) [to (sleep|work)]', group: 0, tag: 'Preposition Noun', reason: 'goes-to-verb' },
  // a dog [retrieve] in the field
  ...['a', 'an'].map(word => ({
    match: `${word} #Adjective? #Noun [#Infinitive] (#Preposition|#Noun)`,
    group: 0, notIf: 'from', tag: 'Noun', reason: 'a-noun-inf',
  })),
  // a software [reinstall]
  { match: '(a|an) #Noun [#Infinitive]$', group: 0, tag: 'Noun', reason: 'noun-infinitive-end' },
  // working for [thank]-you letters
  { match: '#Gerund #Adjective? for [#Infinitive]', group: 0, tag: 'Noun', reason: 'running-for' },
  // about [thank]-you letters
  { match: 'about [#Infinitive]', group: 0, tag: 'Singular', reason: 'about-love' },
  // artists on [thank]-you cards
  { match: '#Plural on [#Infinitive]', group: 0, tag: 'Noun', reason: 'on-stage' },
  // any [thank]-you letter
  { match: 'any [#Infinitive]', group: 0, tag: 'Noun', reason: 'any-charge' },
  // no [thank] you
  { match: 'no [#Infinitive]', group: 0, tag: 'Noun', reason: 'no-doubt' },
  // number of [thank]-yous
  { match: 'number of [#PresentTense]', group: 0, tag: 'Noun', reason: 'number-of-x' },
  // taught [thank]-you etiquette
  { match: '(taught|teaches|learns|learned) [#PresentTense]', group: 0, tag: 'Noun', reason: 'teaches-x' },
  // make [sense]
  { match: '(try|use|attempt|build|make) [%Noun|Verb% #Particle?]', notIf: '(#Copula|#Noun|sure|fun|up)', group: 0, tag: 'Noun', reason: 'do-verb' },//make sure of
  // [append] is cloned
  { match: '^[#Infinitive] (is|was)', group: 0, tag: 'Noun', reason: 'checkmate-is' },
  // get much [thank]-you mail
  { match: '#Infinitive much [#Infinitive]', group: 0, tag: 'Noun', reason: 'get-much' },
  // [cause] i gotta
  { match: '[cause] #Pronoun #Verb', group: 0, tag: 'Conjunction', reason: 'cause-cuz' },
  // the US [air] force
  { match: 'the #Singular [#Infinitive] (#Noun && !#Possessive)', group: 0, tag: 'Noun', notIf: '#Pronoun', reason: 'cardio-dance' },
  // this [rocks]
  { match: 'this [#Plural]', group: 0, tag: 'PresentTense', notIf: '(#Preposition|#Date)', reason: 'this-verbs' },
  // the thing [that runs]
  { match: '#Noun [that %Plural|Verb%]', group: 0, tag: 'Conjunction PresentTense', notIf: '(#Preposition|#Pronoun|way)', reason: 'voice-that-rocks' },
  // that [leads] to
  { match: 'that [#Plural] to', group: 0, tag: 'PresentTense', notIf: '#Preposition', reason: 'that-leads-to' },
  // let him [father] a child
  ...['let', 'make', 'made'].map(word => ({
    match: `${word} (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)`,
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue',
  })),
  // assign all [tasks]
  { match: '#Verb (all|every|each|most|some|no) [#PresentTense]', notIf: '#Modal', group: 0, tag: 'Noun', reason: 'quantifier-verb-noun' },  // PresentTense/Noun ambiguities
  // big dreams, critical thinking
  // found all [upcoming] words
  { match: '(had|have|#PastTense) #Adjective [#PresentTense]', group: 0, tag: 'Noun', notIf: 'better', reason: 'adjective-verb-noun' },
  // one big [thank]-you
  { match: '#Value #Adjective [#PresentTense]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'one-big-reason' },
  // found all [upcoming] words
  { match: '#PastTense #Adjective+ [#PresentTense]', group: 0, tag: 'Noun', notIf: '(#Copula|better)', reason: 'won-wide-support' },
  // many [thanks]
  { match: '(many|few|several|couple) [#PresentTense]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'many-poses' },
  // a very big [dream]
  { match: '#Determiner #Adverb #Adjective [%Noun|Verb%]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'very-big-dream' },
  // from start to [finish]
  { match: 'from #Noun to [%Noun|Verb%]', group: 0, tag: 'Noun', reason: 'start-to-finish' },
  // for comparison or [contrast]
  { match: '(for|with|of) #Noun (and|or|not) [%Noun|Verb%]', group: 0, tag: 'Noun', notIf: '#Pronoun', reason: 'for-food-and-gas' },
  // cute little [thank]-you bags
  { match: '#Adjective #Adjective [#PresentTense]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'adorable-little-store' },
  // writing bigger [thank]-you notes
  { match: '#Gerund #Adverb? #Comparative [#PresentTense]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'higher-costs' },
  // some [thanks] for helping
  { match: '(many|any|some|several) [#PresentTense] for', group: 0, tag: 'Noun', reason: 'any-verbs-for' },
  // to write people [thanks] for helping
  { match: `to #PresentTense #Noun [#PresentTense] #Preposition`, group: 0, tag: 'Noun', reason: 'gas-exchange' },
  // waited until [release]
  {
    match: `#PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]`,
    group: 0,
    tag: 'Noun',
    reason: 'waited-until-release',
  },
  // selling like hot [thank]-you cards
  { match: `#Gerund like #Adjective? [#PresentTense]`, group: 0, tag: 'Plural', reason: 'like-hot-cakes' },
  // some nice [thank]-you notes
  { match: `some #Adjective [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-reason' },
  // for some [thank]-you letters
  { match: `for some [#PresentTense]`, group: 0, tag: 'Noun', reason: 'for-some-reason' },
  // same kind of [shouts]
  { match: `(same|some|the|that|a) kind of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-kind-of' },
  // a type of [shout]
  { match: `(same|some|the|that|a) type of [#PresentTense]`, group: 0, tag: 'Noun', reason: 'some-type-of' },
  // looking good in [thank]-you photos
  { match: `#Gerund #Adjective #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'doing-better-for-x' },
  // get better [thank]-you notes
  { match: `(get|got|have) #Comparative [#PresentTense]`, group: 0, tag: 'Noun', reason: 'got-better-aim' },
  // whose [thanks] are appreciated
  { match: 'whose [#PresentTense] #Copula', group: 0, tag: 'Noun', reason: 'whose-verb-copula' },
  // give up on [thank]-you letters
  { match: `#PhrasalVerb #Particle #Preposition [#PresentTense]`, group: 0, tag: 'Noun', reason: 'given-up-on-x' },
  // there are [thank]-you notes
  { match: 'there (are|were) #Adjective? [#PresentTense]', group: 0, tag: 'Plural', reason: 'there-are' },
  // a thousand [thanks] of gratitude
  { match: '#Value [#PresentTense] of', group: 0, notIf: '(one|1|#Copula|#Infinitive)', tag: 'Plural', reason: '2-trains' },
  // [thanks] are appreciated
  { match: '[#PresentTense] (are|were) #Adjective', group: 0, tag: 'Plural', reason: 'compromises-are-possible' },
  // [hope] i helped
  { match: '^[(hope|guess|thought|think)] #Pronoun #Verb', group: 0, tag: 'Infinitive', reason: 'suppose-i' },
  // its proper [functioning]
  { match: '#Possessive #Adjective [#Verb]', group: 0, tag: 'Noun', notIf: '#Copula', reason: 'our-full-support' },
  // [tastes] good
  { match: '[(tastes|smells)] #Adverb? #Adjective', group: 0, tag: 'PresentTense', reason: 'tastes-good' },
  // Being introduces a predicate rather than a direct object.
  // she is writing [thank]-you letters
  { match: '#Copula (#Gerund && !being) [(#PresentTense && !#Gerund)] !by?', group: 0, tag: 'Noun', notIf: 'going', reason: 'ignoring-commute' },
  // the [shed]
  { match: '#Determiner #Adjective? [(shed|thought|rose|bid|saw|spelt)]', group: 0, tag: 'Noun', reason: 'noun-past' },
  // how to [watch]
  { match: 'how to [%Noun|Verb%]', group: 0, tag: 'Infinitive', reason: 'how-to-noun' },
  // which [boost] it
  { match: 'which [%Noun|Verb%] #Noun', group: 0, tag: 'Infinitive', reason: 'which-boost-it' },
  // asking [questions]
  { match: '#Gerund [%Plural|Verb%]', group: 0, tag: 'Plural', reason: 'asking-questions' },
  // ready to [stream]
  { match: '(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]', group: 0, tag: 'Infinitive', reason: 'ready-to-noun' },
  // bring [to market]
  { match: '(bring|went|go|drive|run|bike) [to (market|work|court|school|bed|church|prison)]', group: 0, tag: 'Preposition Noun', reason: 'bring-to-noun' },
  // can i [sleep], would you [look]
  { match: '#Modal #Noun [%Noun|Verb%]', group: 0, tag: 'Infinitive', reason: 'would-you-look' },
  // is just [spam]
  { match: '#Copula just [#Infinitive]', group: 0, tag: 'Noun', reason: 'is-just-spam' },
  // request copies
  { match: '^%Noun|Verb% %Plural|Verb%', tag: 'Imperative #Plural', reason: 'request-copies' },
  // homemade pickles and [drinks]
  { match: '#Adjective #Plural and [%Plural|Verb%]', group: 0, tag: '#Plural', reason: 'pickles-and-drinks' },
  // the 1968 [stand]-off
  { match: '#Determiner #Year [#Verb]', group: 0, tag: 'Noun', reason: 'the-1968-film' },
  // the [break up]
  { match: '#Determiner [#PhrasalVerb #Particle]', group: 0, tag: 'Noun', reason: 'the-break-up' },
  // the [individual] goals
  { match: '#Determiner [%Adj|Noun%] #Noun', group: 0, tag: 'Adjective', notIf: '(#Pronoun|#Possessive|#ProperNoun)', reason: 'the-individual-goals' },
  // [work] or prepare
  { match: '^[%Noun|Verb%] or #Infinitive', group: 0, tag: 'Infinitive', reason: 'work-or-prepare' },
  // to give [thanks]
  { match: 'to #Infinitive [#PresentTense]', group: 0, tag: 'Noun', notIf: '(#Gerund|#Copula|help)', reason: 'to-give-thanks' },
  // [Google] me
  { match: '[(#Noun && !#Pronoun)] me', group: 0, tag: 'Verb', reason: 'kills-me' },
  // removes wrinkles
  { match: '%Plural|Verb% %Plural|Verb%', tag: '#PresentTense #Plural', reason: 'removes-wrinkles' },
  // i [Google] the answer
  { match: 'i [#Noun] the #Noun', group: 0, tag: 'Infinitive', reason: 'i-water-the-plants' },
  // did the engine [stop]
  {
    match: '(did|does|will) the #Noun [%Noun|Verb%]',
    group: 0,
    tag: 'Infinitive',
    reason: 'question-noun-verb',
  },
  // 40 gallons of [water]
  {
    match: '#Value #Noun of [%Noun|Verb%]',
    group: 0,
    tag: 'Noun',
    reason: 'quantity-of-noun',
  },
  // When the rain [stops], we will leave. Whenever the bell [rings], the dog barks.
  // when the dog [looks]
  ...['stops', 'looks', 'rings'].map(word => ({
    match: `(when|whenever|before|after|until|since|as|while|than) (#Determiner|#Possessive) #Adjective+? #Noun [(%Plural|Verb% && ${word})]$`,
    group: 0,
    tag: 'PresentTense',
    reason: `${word}-clause-verb`,
  })),
  // The sun [rose]. The river [rose] quickly.
  { match: '(sun|moon|river|water|tide|temperature|prices|he|she|we|they|i) [rose] #Adverb+?$', group: 0, tag: 'PastTense', reason: 'sun-rose' },
  // The cat [woke]. Before the dog and the cat [woke], she left.
  { match: '(#Noun && !#Possessive) [woke] #Adverb+?$', group: 0, tag: 'PastTense', reason: 'cat-woke' },
]
