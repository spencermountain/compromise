import connectors from './connectors.js'

// Corrections matched against the main sweep's output, before any are applied.
// dogs [near] the house [bark]
const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'
const tired = [
  // He [was] [tired].
  { match: '[(#Copula|been)] #Adverb+? [tired]$', position: 'end' },
  // Although he [was] [tired], he smiled.
  { match: '[(#Copula|been)] #Adverb+? [(tired && @hasComma)]', position: 'comma' },
]
// Which chair did she [sit] [on]?
const seatedQuestion = '^(which|what) #Adjective+? #Noun (did|does|do|#Modal) #Pronoun [sit] [on]$'

const rules = [
  // veggies, [like] kale
  { match: '(#Noun && @hasComma) [like] #Noun', hook: 'like', group: 0, tag: 'Preposition', reason: 'comma-like-example' },
  ...connectors,
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...tired.flatMap(({ match, position }) => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, hook: 'tired', group: 0, tag: 'Copula', unTag: 'Passive', reason: `tired-${position}-copula` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, hook: 'tired', group: 0, unTag: 'Auxiliary', reason: `tired-${position}-unaux` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, hook: 'tired', group: 1, tag: 'Adjective', reason: `tired-${position}-adjective` },
  ]),
  // had been tired
  { match: '(has|have|had) (#Adverb|not)+? been #Adverb+? tired$', hook: 'tired', unTag: 'Passive', reason: 'perfect-tired-unpassive' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { match: seatedQuestion, hook: 'sit', group: 0, unTag: 'PhrasalVerb', reason: 'sit-question-unphrasal' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { match: seatedQuestion, hook: 'sit', group: 1, tag: 'Preposition', reason: 'sit-question-preposition' },
  // “May twenty five”
  { match: '(#TextValue && #Date) #TextValue', hook: '#TextValue', tag: 'Date', reason: 'textvalue-date' },
  // 23 Main Street in Toronto
  { match: '#Address in #Place', hook: 'in', tag: 'Place', reason: 'address-place' },
  // the very [professional] actor
  {
    match: '#Determiner (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    hook: '#Actor',
    group: 0,
    tag: 'Adjective',
    reason: 'degree-actor',
  },
  // the [sleeping] dog
  {
    match: '#Determiner [sleeping] (#Actor|#Person|puppy|kitten|dog|cat|baby|babies|child|children)',
    hook: 'sleeping',
    group: 0,
    tag: 'Adjective',
    reason: 'sleeping-modifier',
  },
  // he ate, and [left]
  {
    match: '(#PastTense && @hasComma) and [%Adj|Past%] #Adverb+?$',
    hook: 'and',
    group: 0,
    tag: 'PastTense',
    reason: 'past-tense-list',
  },
  // [water] broke the pipe
  {
    match: '^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun',
    hook: '#PastTense',
    group: 0,
    tag: 'Noun',
    reason: 'bare-subject-past',
  },
  // the [present] immediately
  { match: '#Determiner [present] #Adverb+$', hook: 'present', group: 0, tag: 'Noun', reason: 'present-object' },
  // [falls in] June
  { match: '[(fall|falls|fell) in] #Month', hook: 'in', group: 0, tag: '#Verb #Preposition', reason: 'fall-in-month' },
  // [had] he walked
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-condition', notIf: '@hasQuestionMark' },
  // [were] he to walk
  { match: '^[were] #Noun+ to #Infinitive *$', hook: 'were', group: 0, tag: 'Condition', reason: 'were-he', notIf: '@hasQuestionMark' },
  // [had] he walked?
  { match: '^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question-end', notIf: '@hasComma' },
  // [had] he walked the dog?
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$', hook: 'had', group: 0, tag: 'Auxiliary', reason: 'had-question-object', notIf: '@hasComma' },
  // then, [had] he walked
  { match: '@hasComma [had] #Noun+ (#Adverb|not)+? #PastTense', hook: 'had', group: 0, tag: 'Condition', reason: 'had-comma-condition', notIf: '@hasQuestionMark' },
  // does [this] work
  { match: '(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive', hook: '#Infinitive', group: 0, tag: 'Pronoun', reason: 'demonstrative-question' },
  // [This] is useful. Hope [this] helps. [This] really rocks.
  { match: '[this] #Adverb+? (#PresentTense && !#Infinitive && !#Gerund)', hook: 'this', group: 0, tag: 'Pronoun', reason: 'this-finite-subject' },
  // [This] will be one sentence. [This] might help.
  { match: '[this] #Adverb+? #Modal #Adverb+? #Infinitive', hook: 'this', group: 0, tag: 'Pronoun', reason: 'this-modal-subject' },
  // has [read], had [put]
  { match: '(has|have|had) (#Adverb|not)+? [(read|put)]', group: 0, tag: 'Participle', reason: 'perfect-invariant' },
  // what [work] he did
  { match: '(which|what|whose) [%Noun|Verb%] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Noun', reason: 'embedded-wh-object' },
  // what [walks] he took
  { match: '(which|what|whose) [%Plural|Verb%] #Pronoun', hook: '#Pronoun', group: 0, tag: 'Plural', reason: 'embedded-wh-plural' },
  // John and Mary [walk]
  { match: '#Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$', hook: 'and', group: 0, tag: 'Infinitive', reason: 'joint-subject-verb' },
  // dogs [near] the house [bark]
  { match: locative, hook: '#Plural', group: 0, tag: 'Preposition', reason: 'subject-locative' },
  // dogs [near] the house [bark]
  { match: locative, hook: '#Plural', group: 1, tag: 'Infinitive', reason: 'subject-locative-verb' },
  // being [injured] and treated
  { match: 'being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)', hook: 'being', group: 0, tag: 'PastTense', reason: 'coordinated-passive' },
  // has eaten and [drunk]
  { match: '(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]', hook: 'drunk', group: 0, tag: 'Participle', reason: 'coordinated-drunk' },
  // dogs, [including] the poodle
  { match: '(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun', hook: 'including', group: 0, tag: 'Preposition', reason: 'including-list' },
  // can you [walk], please?
  { match: '^(can|could|will|would) you (#Adverb|not)+? [(#Infinitive && @hasComma)] please$', hook: 'please', group: 0, tag: 'Imperative', reason: 'request-verb-comma' },
  // can you [walk] the dog, please?
  { match: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] * @hasComma please$', hook: 'please', group: 0, tag: 'Imperative', reason: 'request-object-comma' },
  // she drew a picture
  { match: '(drew && #Verb)', hook: 'drew', tag: 'PastTense', reason: 'drew-a-picture' },
  // keep the lid [closed]
  {
    match: '#Imperative #Determiner #Noun+ [%Adj|Past%]',
    hook: '#Imperative',
    group: 0,
    tag: 'Adjective',
    reason: 'keep-lid-closed',
  }
]
console.log('  ', rules.length, 'matches second-pass\n\n')

export default rules
