const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
export default [
  //'more' is not always an adverb
  // any more
  { match: '(the|any) [more]', hook: 'more', group: 0, tag: 'Singular', reason: 'more-noun' },
  // more players
  { match: '[more] #Noun', hook: 'more', group: 0, tag: 'Adjective', reason: 'more-noun' },
  // rights of man
  { match: '(right|rights) of .', hook: 'of', tag: 'Noun', reason: 'right-of' },
  // a bit
  { match: 'a [bit]', hook: 'bit', group: 0, tag: 'Singular', reason: 'bit-2' },
  // a must
  { match: 'a [must]', hook: 'must', group: 0, tag: 'Singular', reason: 'must-2' },
  // we all
  { match: '(we|us) [all]', hook: 'all', group: 0, tag: 'Noun', reason: 'we all' },
  // due to weather
  { match: 'due to [#Verb]', hook: 'due', group: 0, tag: 'Noun', reason: 'due-to' },

  // some walking dogs
  { match: 'some [#Verb] #Plural', hook: 'some', group: 0, tag: 'Noun', reason: 'determiner6' },
  // my first thought
  { match: '#Possessive #Ordinal [#PastTense]', hook: '#Ordinal', group: 0, tag: 'Noun', reason: 'first-thought' },
  // the nice walk
  {
    match: '(the|this|those|these) #Adjective [%Noun|Verb%]', hook: '#Adjective',
    group: 0,
    tag: 'Noun',
    notIf: '#Copula',
    reason: 'the-adj-verb',
  },
  // the truly nice swim
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', hook: '#Adverb', group: 0, tag: 'Noun', reason: 'determiner4' },
  // the message from Danny
  { match: 'the [#Verb] #Preposition .', hook: 'the', group: 0, tag: 'Noun', reason: 'determiner1' },
  // the manufacture of perfume
  { match: '(a|an|the) [#Verb] of', hook: 'of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  // a type of shout
  { match: '#Determiner #Noun of [#Verb]', hook: 'of', group: 0, tag: 'Noun', notIf: '#Gerund', reason: 'noun-of-noun' },
  // waited until release
  {
    match: '#PastTense #Preposition [#PresentTense]', hook: '#PastTense',
    group: 0,
    notIf: '#Gerund',
    tag: 'Noun',
    reason: 'ended-in-ruins',
  },
  // and u
  { match: '#Conjunction [u]', hook: 'u', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' },
  // u made me smile
  { match: '[u] #Verb', hook: 'u', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },
  // the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun', hook: '#Determiner',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },
  // water-flows
  { match: '(#Singular && @hasHyphen) #PresentTense', hook: '#PresentTense', tag: 'Noun', reason: 'hyphen-verb' },
  // is no going back
  { match: 'is no [#Verb]', hook: 'no', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  // do so
  { match: 'do [so]', hook: 'so', group: 0, tag: 'Noun', reason: 'so-noun' },
  // what the hell
  { match: '#Determiner [(shit|damn|hell)]', hook: '#Determiner', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // go to shit
  { match: 'to [(shit|hell)]', hook: 'to', group: 0, tag: 'Noun', reason: 'to-swears' },
  // the staff were
  { match: '(the|these) [#Singular] (were|are)', hook: '#Singular', group: 0, tag: 'Plural', reason: 'singular-were' },
  // a greeting or thank you
  { match: `a #Noun+ or #Adverb+? [#Verb]`, hook: 'or', group: 0, tag: 'Noun', reason: 'noun-or-noun' },
  // and check this out! a walk-in microwave.
  {
    match: '(the|those|these|a|an) #Adjective? [#PresentTense #Particle?]', hook: '#PresentTense',
    group: 0,
    tag: 'Noun',
    notIf: '(seem|appear|include|#Gerund|#Copula)',
    reason: 'det-inf',
  },

  // ==== Actor ====
  // Aircraft designer
  { match: '#Noun #Actor', hook: '#Actor', tag: 'Actor', notIf: '(#Person|#Pronoun)', reason: 'thing-doer' },
  // lighting designer
  { match: '#Gerund #Actor', hook: '#Gerund', tag: 'Actor', reason: 'gerund-doer' },
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific', reason: 'sgt-kelly' },
  // co founder
  { match: `co #Singular`, hook: 'co', tag: 'Actor', reason: 'co-noun' },
  // aircraft designer
  {
    match: `[#Noun+] #Actor`, hook: '#Actor',
    group: 0,
    tag: 'Actor',
    notIf: '(#Honorific|#Pronoun|#Possessive)',
    reason: 'air-traffic-controller',
  },
  // fine-artist
  {
    match: `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #Noun? #Actor`, hook: '#Actor',
    tag: 'Actor',
    reason: 'fine-artist',
  },
  // dance coach
  {
    match: `#Noun+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`, hook: '#Noun',
    tag: 'Actor',
    reason: 'dance-coach',
  },
  // chief design officer
  { match: `chief . officer`, hook: 'chief', tag: 'Actor', reason: 'chief-x-officer' },
  // chief of police
  { match: `chief of #Noun+`, hook: 'chief', tag: 'Actor', reason: 'chief-of-police' },
  // president of marketing
  { match: `senior? vice? president of #Noun+`, hook: 'president', tag: 'Actor', reason: 'president-of' },

  // ==== Singular ====
  // the sun
  { match: '#Determiner [sun]', hook: 'sun', group: 0, tag: 'Singular', reason: 'the-sun' },
  // did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]$', hook: '#Value', group: 0, tag: 'Singular', reason: 'did-a-value' },
  // the can
  { match: 'the [(can|will|may)]', hook: 'the', group: 0, tag: 'Singular', reason: 'the can' },

  // ==== Possessive ====
  // John Smith's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', hook: '#Possessive', tag: 'Possessive', reason: 'name-poss' },
  // Microsoft Research's office
  { match: '#Organization+ #Possessive', hook: '#Possessive', tag: 'Possessive', reason: 'org-possessive' },
  // Los Angeles's fundraiser
  { match: '#Place+ #Possessive', hook: '#Possessive', tag: 'Possessive', reason: 'place-possessive' },
  // my butt smells
  { match: '#Possessive #PresentTense #Particle?', hook: '#Possessive', notIf: '(#Gerund|her)', tag: 'Noun', reason: 'possessive-verb' }, // anna's eating vs anna's eating lunch
  // my teachers dog
  { match: '(my|our|their|her|his|its) [(#Plural && #Actor)] #Noun', hook: '#Actor', tag: 'Possessive', reason: 'my-dads' },

  // 10th of a second
  { match: '#Value of a [second]', hook: 'second', group: 0, unTag: 'Value', tag: 'Singular', reason: '10th-of-a-second' },
  // 10 seconds
  { match: '#Value [seconds]', hook: 'seconds', group: 0, unTag: 'Value', tag: 'Plural', reason: '10-seconds' },
  // in love
  { match: 'in [#Infinitive]', hook: 'in', group: 0, tag: 'Singular', reason: 'in-age' },
  // a minor in
  { match: 'a [#Adjective] #Preposition', hook: 'a', group: 0, tag: 'Noun', reason: 'a-minor-in' },
  // the repairer said
  { match: '#Determiner [#Singular] said', hook: 'said', group: 0, tag: 'Actor', reason: 'the-actor-said' },
  // the euro sense
  {
    match: `#Determiner #Noun [${infNouns}] !(#Preposition|to|#Adverb)?`, hook: '#Determiner',
    group: 0,
    tag: 'Noun',
    reason: 'the-noun-sense',
  },
  // thanks for the gift are overdue
  { match: '[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula', hook: '#Copula', group: 0, tag: 'Plural', reason: 'photographs-of' },
  // You eat and sleep
  { match: '#Infinitive and [%Noun|Verb%]', hook: 'and', group: 0, tag: 'Infinitive', reason: 'fight and win' },
  // dogs and running and cats
  { match: '#Noun and [#Verb] and #Noun', hook: 'and', group: 0, tag: 'Noun', reason: 'peace-and-flowers' },
  // the 1992 classic
  { match: 'the #Cardinal [%Adj|Noun%]', hook: 'the', group: 0, tag: 'Noun', reason: 'the-1992-classic' },
  // This is the premier university in Virginia
  { match: '#Copula the [%Adj|Noun%] #Noun', hook: 'the', group: 0, tag: 'Adjective', reason: 'the-premier-university' },

  // i ate me sandwich (scottish slang)
  { match: 'i #Verb [me] #Noun', hook: 'me', group: 0, tag: 'Possessive', reason: 'scottish-me' },
  // dance music
  {
    match: '[#Infinitive] (music|class|lesson|night|party|festival|league|ceremony)', hook: '#Infinitive',
    group: 0,
    tag: 'Noun',
    reason: 'dance-music',
  },
  // wit it
  { match: '[wit] (me|it)', hook: 'wit', group: 0, tag: 'Preposition', reason: 'wit-me' },
  // He bowed his head in prayer
  { match: '#PastTense #Possessive [#Verb]', hook: '#Possessive', group: 0, tag: 'Noun', notIf: '(saw|made)', reason: 'left-her-boots' },
  // 35 signs
  { match: '#Value [%Plural|Verb%]', hook: '#Value', group: 0, tag: 'Plural', notIf: '(one|1|a|an)', reason: '35-signs' },
  // had time
  { match: 'had [#PresentTense]', hook: 'had', group: 0, tag: 'Noun', notIf: '(#Gerund|come|become)', reason: 'had-time' },
  // instant access
  { match: '%Adj|Noun% %Noun|Verb%', hook: '%Adj|Noun%', tag: '#Adjective #Noun', notIf: '#ProperNoun #Noun', reason: 'instant-access' },
  // a representative to
  { match: '#Determiner [%Adj|Noun%] #Conjunction', hook: '#Conjunction', group: 0, tag: 'Noun', reason: 'a-rep-to' },
  // near death experiences, ambitious sales targets
  {
    match: '#Adjective #Noun [%Plural|Verb%]$', hook: '#Adjective',
    group: 0,
    tag: 'Plural',
    notIf: '#Pronoun',
    reason: 'near-death-experiences',
  },
  // your guild colors
  { match: '#Possessive #Noun [%Plural|Verb%]$', hook: '#Possessive', group: 0, tag: 'Plural', reason: 'your-guild-colors' },
]
