// Corrections matched against the main sweep's output, before any are applied.
const embedding = '(know|knows|knew|hope|hopes|hoped|think|thinks|thought|believe|believes|believed|expect|expects|expected)'
const embeddedVerb = `${embedding} [(this|that)] [%Plural|Verb%] #Adverb+?$`
const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

export default [
  // Inverted conditions and questions use ordinary punctuation predicates.
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-he', notIf: '@hasQuestionMark' },
  { match: '^[were] #Noun+ to #Infinitive *$', hook: 'were', group: 0, tag: 'Condition', reason: 'were-he', notIf: '@hasQuestionMark' },
  { match: '^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question', notIf: '@hasComma' },
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question', notIf: '@hasComma' },
  { match: '@hasComma [had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-he', notIf: '@hasQuestionMark' },
  // Demonstratives can act as subjects at the start of a sentence.
  { match: '^[(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)', hook: '#Verb', group: 0, tag: 'Pronoun', reason: 'demonstrative-subject' },
  { match: '(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive', hook: '#Infinitive', group: 0, tag: 'Pronoun', reason: 'demonstrative-question' },
  // Select both terms from the same incoming pattern: no extra pass is needed
  // to turn “that” into a pronoun after correcting “works” in “I know that works”.
  { match: embeddedVerb, hook: '%Plural|Verb%', group: 1, tag: 'PresentTense', reason: 'embedded-demonstrative-verb' },
  { match: embeddedVerb, hook: '%Plural|Verb%', group: 0, tag: 'Pronoun', reason: 'embedded-demonstrative-subject' },
  { match: `${embedding} [(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)`, hook: '#Verb', group: 0, tag: 'Pronoun', reason: 'embedded-demonstrative-subject' },
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
  // Sentence matching needs explicit patterns for subjects following a comma
  // or colon; ^ only identifies the beginning of the complete sentence.
  { match: '@hasComma [(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)', hook: '#Verb', group: 0, tag: 'Pronoun', reason: 'demonstrative-subject' },
  { match: '@hasColon [(this|that|these|those)] #Adverb+? (#Verb && !#Gerund && !#Participle)', hook: '#Verb', group: 0, tag: 'Pronoun', reason: 'demonstrative-subject' },
]
