// Corrections matched against the main sweep's output, before any are applied.
const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

export default [
  // ...questionRules,
  // These contexts need the resolved tags from the first sweep.
  {
    match: '#Determiner (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    hook: '#Actor',
    group: 0,
    tag: 'Adjective',
    reason: 'degree-modified-actor',
  },
  // Keep nominal compounds such as 'sleeping aid' and 'sleeping bag'.
  {
    match: '#Determiner [sleeping] (#Actor|#Person|puppy|kitten|dog|cat|baby|babies|child|children)',
    hook: 'sleeping',
    group: 0,
    tag: 'Adjective',
    reason: 'sleeping-modifier',
  },
  {
    match: '(#PastTense && @hasComma) and [%Adj|Past%] #Adverb+?$',
    hook: 'and',
    group: 0,
    tag: 'PastTense',
    reason: 'past-tense-list',
  },
  {
    match: '^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun',
    hook: '#PastTense',
    group: 0,
    tag: 'Noun',
    reason: 'bare-subject-past',
  },
  { match: '#Determiner [present] #Adverb+$', hook: 'present', group: 0, tag: 'Noun', reason: 'present-object' },
  { match: '[(fall|falls|fell) in] #Month', hook: 'in', group: 0, tag: '#Verb #Preposition', reason: 'fall-in-month' },
  // Inverted conditions and questions use ordinary punctuation predicates.
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-he', notIf: '@hasQuestionMark' },
  { match: '^[were] #Noun+ to #Infinitive *$', hook: 'were', group: 0, tag: 'Condition', reason: 'were-he', notIf: '@hasQuestionMark' },
  { match: '^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question', notIf: '@hasComma' },
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question', notIf: '@hasComma' },
  { match: '@hasComma [had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-he', notIf: '@hasQuestionMark' },
  { match: '(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive', hook: '#Infinitive', group: 0, tag: 'Pronoun', reason: 'demonstrative-question' },
  { match: '(has|have|had) (#Adverb|not)+? [read]', hook: 'read', group: 0, tag: 'Participle', reason: 'perfect-read' },
  { match: '(which|what|whose) [%Noun|Verb%] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Noun', reason: 'embedded-wh-object' },
  { match: '(which|what|whose) [%Plural|Verb%] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Plural', reason: 'embedded-wh-plural' },
  // Capitalization predicates keep surnames such as “Alice and Bob Walk”.
  { match: '#Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$', hook: 'and', group: 0, tag: 'Infinitive', reason: 'coordinated-subject-verb' },
  // The two captures correct “near” and “bark” in “dogs near the house bark”.
  { match: locative, hook: '#Plural', group: 0, tag: 'Preposition', reason: 'subject-locative' },
  { match: locative, hook: '#Plural', group: 1, tag: 'Infinitive', reason: 'subject-locative-verb' },
  { match: 'being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)', hook: 'being', group: 0, tag: 'PastTense', reason: 'coordinated-passive' },
  { match: '(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]', hook: 'drunk', group: 0, tag: 'Participle', reason: 'coordinated-drunk' },
  { match: '(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun', hook: 'including', group: 0, tag: 'Preposition', reason: 'including-list' },
  // Requests can put the comma on the verb itself or on a later object.
  { match: '^(can|could|will|would) you (#Adverb|not)+? [(#Infinitive && @hasComma)] please$', hook: 'please', group: 0, tag: 'Imperative', reason: 'would-you-comma-please' },
  { match: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] * @hasComma please$', hook: 'please', group: 0, tag: 'Imperative', reason: 'would-you-comma-please' },
  // past-tense people
  { match: '(drew && #Verb)', hook: 'drew', tag: 'PastTense', reason: 'drew-a-picture' },
  // keep the lid closed
  {
    match: '#Imperative #Determiner #Noun+ [%Adj|Past%]',
    hook: '#Imperative',
    group: 0,
    tag: 'Adjective',
    reason: 'keep-lid-closed',
  },
]
