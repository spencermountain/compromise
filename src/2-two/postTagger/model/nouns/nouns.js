const infNouns =
  '(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)'
export default [
  //'more' is not always an adverb
  // any [more]
  // left-right: { match: '(the|any) [more]', group: 0, tag: 'Singular', reason: 'more-noun' },
  // [more] players
  // left-right: { match: '[more] #Noun', group: 0, tag: 'Adjective', reason: 'more-adj' },
  // [rights] of man
  { match: '[(right|rights)] of .', group: 0, tag: 'Noun', reason: 'right-of' },
  // a [bit]
  // left-right: { match: 'a [bit]', group: 0, tag: 'Singular', reason: 'a-bit' },
  // a [must]
  // left-right: { match: 'a [must]', group: 0, tag: 'Singular', reason: 'a-must' },
  // we [all]
  { match: '(we|us) [all]', group: 0, tag: 'Noun', reason: 'we-all' },
  // due to [weather]
  { match: 'due to [#Verb]', group: 0, tag: 'Noun', reason: 'due-to' },

  // my first [thought]
  { match: '#Possessive #Ordinal [#PastTense]', group: 0, tag: 'Noun', reason: 'first-thought' },
  // the nice [walk]
  {
    match: '(the|this|those|these) #Adjective [%Noun|Verb%]',
    group: 0,
    tag: 'Noun',
    notIf: '#Copula',
    reason: 'adj-verb',
  },
  // the truly nice [swim]
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'det-adv-verb' },
  // the [message] from Danny
  { match: 'the [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'det-verb-prep' },
  // the [manufacture] of perfume
  // left-right: { match: '(a|an|the) [#Verb] of', group: 0, tag: 'Noun', reason: 'verb-of' },
  // a type of [shout]
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', notIf: '#Gerund', reason: 'noun-of-noun' },
  // waited until [release]
  {
    match: '#PastTense #Preposition [#PresentTense]',
    group: 0,
    notIf: '#Gerund',
    tag: 'Noun',
    reason: 'ended-in-ruins',
  },
  // and [u]
  // left-right: { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'conjunction-u' },
  // [u] made me smile
  // left-right: { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-verb' },
  // water-flows
  { match: '(#Singular && @hasHyphen) #PresentTense', tag: 'Noun', reason: 'hyphen-verb' },
  // is no [going] back
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  // do [so]
  // left-right: { match: 'do [so]', group: 0, tag: 'Adverb', reason: 'so-noun' },
  // what the [hell]
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // go to [shit]
  { match: 'to [(shit|hell)]', group: 0, tag: 'Noun', reason: 'to-swears' },
  // the [staff] were
  // left-right: { match: '(the|these) [#Singular] (were|are)', group: 0, tag: 'Plural', reason: 'sing-were' },
  // and check this out! a [walk-in] microwave.
  {
    match: '(the|those|these|a|an) #Adjective? [(#PresentTense && !#Gerund && !#Copula && !seem && !appear && !include) #Particle?]',
    group: 0,
    tag: 'Noun',
    notIf: 'the (poor|rich|young|old|elderly|unemployed|homeless|disabled)',
    reason: 'det-inf',
  },

  // ==== Actor ====
  // Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', notIf: '(#Person|#Pronoun)', reason: 'thing-doer' },
  // lighting designer
  { match: '#Gerund #Actor', tag: 'Actor', reason: 'ger-doer' },
  // captain sanders
  // { match: '[#Actor+] #ProperNoun', group: 0, tag: 'Honorific', reason: 'sgt-kelly' },
  // co founder
  { match: `co #Singular`, tag: 'Actor', reason: 'co-noun' },
  // [aircraft] designer
  {
    match: `[#Noun+] #Actor`,
    group: 0,
    tag: 'Actor',
    notIf: '(#Honorific|#Pronoun|#Possessive)',
    reason: 'air-traffic',
  },
  // fine-artist
  {
    match: `(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #Noun? #Actor`,
    tag: 'Actor',
    reason: 'fine-artist',
  },
  // dance coach
  {
    match: `#Noun+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)`,
    tag: 'Actor',
    reason: 'dance-coach',
  },
  // chief design officer
  { match: `chief . officer`, tag: 'Actor', reason: 'chief-officer' },
  // chief of police
  { match: `chief of #Noun+`, tag: 'Actor', reason: 'chief-police' },
  // president of marketing
  { match: `senior? vice? president of #Noun+`, tag: 'Actor', reason: 'president-of' },

  // ==== Singular ====
  // the [sun]
  // left-right: { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'sun' },
  // did a [900], paid a [20]
  { match: '#Verb (a|an) [#Value]$', group: 0, tag: 'Singular', reason: 'did-a-value' },
  // the [can]
  { match: 'the [(can|will|may)]', group: 0, tag: 'Singular', reason: 'can' },

  // ==== Possessive ====
  // John Smith's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  // Microsoft Research's office
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-poss' },
  // Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-poss' },
  // my butt smells
  { match: '#Possessive #PresentTense #Particle?', notIf: '(#Gerund|her)', tag: 'Noun', reason: 'poss-verb' }, // anna's eating vs anna's eating lunch
  // my [teachers] dog
  { match: '(my|our|their|her|his|its) [(#Plural && #Actor)] #Noun', group: 0, tag: 'Possessive', reason: 'my-dads' },

  // 10th of a [second]
  { match: '#Value of a [second]', group: 0, unTag: 'Value', tag: 'Singular', reason: '10th-second' },
  // 10 [seconds]
  { match: '#Value [seconds]', group: 0, unTag: 'Value', tag: 'Plural', reason: '10-seconds' },
  // in [love]
  // left-right: { match: 'in [#Infinitive]', group: 0, tag: 'Singular', reason: 'in-age' },
  // a [minor] in
  // left-right: { match: 'a [#Adjective] #Preposition', group: 0, tag: 'Noun', reason: 'a-minor-in' },
  // the [repairer] said
  // left-right: { match: '#Determiner [#Singular] said', group: 0, tag: 'Actor', reason: 'actor-said' },
  // the euro [sense]
  {
    match: `#Determiner #Noun [${infNouns}] !(#Preposition|to|#Adverb)?`,
    group: 0,
    tag: 'Noun',
    reason: 'noun-sense',
  },
  // [thanks] for the gift are overdue
  { match: '[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula', group: 0, tag: 'Plural', reason: 'photographs-of' },
  // You eat and [sleep]
  { match: '#Infinitive and [%Noun|Verb%]', group: 0, tag: 'Infinitive', reason: 'fight-and-win' },
  // dogs and [running] and cats
  { match: '#Noun and [#Verb] and #Noun', group: 0, tag: 'Noun', reason: 'and-flowers' },
  // the 1992 [classic]
  { match: 'the #Cardinal [%Adj|Noun%]', group: 0, tag: 'Noun', reason: '1992-classic' },
  // This is the [premier] university in Virginia
  { match: '#Copula the [%Adj|Noun%] #Noun', group: 0, tag: 'Adjective', reason: 'premier-uni' },

  // i ate [me] sandwich (scottish slang)
  { match: 'i #Verb [me] #Noun', group: 0, tag: 'Possessive', reason: 'scottish-me' },
  // [dance] music
  {
    match: '[(dance|rock|rap|swing)] (music|class|lesson|night|party|festival|league|ceremony)',
    group: 0,
    tag: 'Noun',
    reason: 'dance-music',
  },
  // [wit] it
  // left-right: { match: '[wit] (me|it)', group: 0, tag: 'Preposition', reason: 'wit-me' },
  // He bowed his [head] in prayer
  { match: '#PastTense #Possessive [#Verb]', group: 0, tag: 'Noun', notIf: '(saw|made)', reason: 'left-her-boots' },
  // 35 [signs]
  { match: '#Value [%Plural|Verb%]', group: 0, tag: 'Plural', notIf: '(one|1|a|an)', reason: '35-signs' },
  // had [time]
  { match: 'had [%Noun|Verb%]', group: 0, tag: 'Noun', notIf: '(#Gerund|come|become)', reason: 'had-time' },
  // instant access
  { match: '%Adj|Noun% %Noun|Verb%', tag: '#Adjective #Noun', notIf: '#ProperNoun #Noun', reason: 'instant-access' },
  // a [representative] to
  { match: '#Determiner [%Adj|Noun%] #Conjunction', group: 0, tag: 'Noun', reason: 'a-rep-to' },
  // near death experiences, ambitious sales [targets]
  {
    match: '#Adjective #Noun [%Plural|Verb%]$',
    group: 0,
    tag: 'Plural',
    notIf: '#Pronoun',
    reason: 'near-death',
  },
  // your guild [colors]
  { match: '#Possessive #Noun [(colors|colours)]$', group: 0, tag: 'Plural', reason: 'guild-colors' },
]
