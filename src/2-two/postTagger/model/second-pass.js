import connectors from './connectors.js'

// Corrections matched against the main sweep's output, before any are applied.
// const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'
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
  { match: '(#Noun && @hasComma) [like] #Noun', group: 0, tag: 'Preposition', reason: 'comma-like-ex' },
  // Keep comma context, but don't turn unambiguous verbs into list items.
  ...['%Noun|Verb%', '%Plural|Verb%', 'thanks'].map(target => ({
    match: `(#Noun && @hasComma) #Noun (and|or) [(${target} && #PresentTense)]`,
    group: 0,
    tag: 'Noun',
    notIf: '#Copula',
    reason: 'noun-list',
  })),
  ...connectors,
  // Possession of running water and enduring noun phrases are not progressives.
  { match: '[(have|has|had)] running water', group: 0, unTag: 'Auxiliary', reason: 'have-water' },
  { match: '[#Copula] (enduring && #Adjective) #Noun', group: 0, unTag: 'Auxiliary', reason: 'enduring-cop' },
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...tired.flatMap(({ match, position }) => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, group: 0, tag: 'Copula', unTag: 'Passive', reason: `tired-${position}-cop` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, group: 0, unTag: 'Auxiliary', reason: `tired-${position}-unaux` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { match, group: 1, tag: 'Adjective', reason: `tired-${position}-adj` },
  ]),
  // had been tired
  { match: '(has|have|had) (#Adverb|not)+? been #Adverb+? tired$', unTag: 'Passive', reason: 'tired-unpass' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { match: seatedQuestion, group: 0, unTag: 'PhrasalVerb', reason: 'sit-q-unphr' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { match: seatedQuestion, group: 1, tag: 'Preposition', reason: 'sit-q-prep' },
  // “May twenty five”
  { match: '(#TextValue && #Date) #TextValue', tag: 'Date', reason: 'textvalue-date' },
  // 23 Main Street in Toronto
  { match: '#Address in #Place', tag: 'Place', reason: 'address-place' },
  // the very [professional] actor
  {
    match: '#Determiner (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    group: 0,
    tag: 'Adjective',
    reason: 'degree-actor',
  },
  // the [sleeping] dog
  {
    match: '#Determiner [sleeping] (#Actor|#Person|puppy|kitten|dog|cat|baby|babies|child|children)',
    group: 0,
    tag: 'Adjective',
    reason: 'sleeping-mod',
  },
  // he ate, and [left]
  {
    match: '(#PastTense && @hasComma) and [%Adj|Past%] #Adverb+?$',
    group: 0,
    tag: 'PastTense',
    reason: 'past-list',
  },
  // [water] broke the pipe
  {
    match: '^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'bare-subj-past',
  },
  // the [present] immediately
  { match: '#Determiner [present] #Adverb+$', group: 0, tag: 'Noun', reason: 'present-obj' },
  // [falls in] June
  { match: '[(fall|falls|fell) in] #Month', group: 0, tag: '#Verb #Preposition', reason: 'fall-in-month' },
  // [had] he walked
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense', group: 0, tag: 'Condition', reason: 'had-cond', notIf: '@hasQuestionMark' },
  // [were] he to walk
  { match: '^[were] #Noun+ to #Infinitive *$', group: 0, tag: 'Condition', reason: 'were-he', notIf: '@hasQuestionMark' },
  // [had] he walked?
  { match: '^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$', group: 0, tag: 'Auxiliary', reason: 'had-q-end', notIf: '@hasComma' },
  // [had] he walked the dog?
  { match: '^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$', group: 0, tag: 'Auxiliary', reason: 'had-q-obj', notIf: '@hasComma' },
  // then, [had] he walked
  { match: '@hasComma [had] #Noun+ (#Adverb|not)+? #PastTense', group: 0, tag: 'Condition', reason: 'had-comma-cond', notIf: '@hasQuestionMark' },
  // does [this] work
  { match: '(do|does|did|#Modal) [(this|that|these|those)] #Adverb+? #Infinitive', group: 0, tag: 'Pronoun', reason: 'dem-q' },
  // [This] is useful. Hope [this] helps. [This] really rocks.
  { match: '[this] #Adverb+? (#PresentTense && !#Infinitive && !#Gerund)', group: 0, tag: 'Pronoun', reason: 'this-finite-subj' },
  // [This] will be one sentence. [This] might help.
  { match: '[this] #Adverb+? #Modal #Adverb+? #Infinitive', group: 0, tag: 'Pronoun', reason: 'this-modal-subj' },
  // has [read], had [put]
  ...['read', 'put'].map(word => ({
    match: `(has|have|had) (#Adverb|not)+? [${word}]`,
    group: 0, tag: 'Participle', reason: 'perf-invar',
  })),
  // what [work] he did
  { match: '(which|what|whose) [%Noun|Verb%] #Pronoun', group: 0, tag: 'Noun', reason: 'embed-wh-obj' },
  // what [walks] he took
  { match: '(which|what|whose) [%Plural|Verb%] #Pronoun', group: 0, tag: 'Plural', reason: 'embed-wh-pl' },
  // John and Mary [walk]
  {
    match: '#Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$',
    group: 0,
    tag: 'Infinitive',
    reason: 'joint-subj-verb',
  },
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    {
      match: `#Plural [${word}] #Determiner #Adjective+? #Noun [%Noun|Verb%]$`,
      group: 0,
      tag: 'Preposition',
      reason: 'subj-loc',
    },
    {
      match: `#Plural [${word}] #Determiner #Adjective+? #Noun [%Noun|Verb%]$`,
      group: 1,
      tag: 'Infinitive',
      reason: 'subj-loc-verb',
    },
  ]),
  // { match: locative, group: 0, tag: 'Preposition', reason: 'subj-loc' },
  // { match: locative, group: 1, tag: 'Infinitive', reason: 'subj-loc-verb' },
  // being [injured] and treated
  { match: 'being #Adverb+? [%Adj|Past%] (and|or) #Adverb+? (#PastTense|#Participle)', group: 0, tag: 'PastTense', reason: 'coord-pass' },
  // has eaten and [drunk]
  { match: '(has|have|had) (#Adverb|not)+? #PastTense (and|or) #Adverb+? [drunk]', group: 0, tag: 'Participle', reason: 'coord-drunk' },
  // dogs, [including] the poodle
  { match: '(#Noun && @hasComma) [including] all? #Determiner? #Cardinal+? #Adverb+? #Adjective+? #Noun', group: 0, tag: 'Preposition', reason: 'including-list' },
  // can you [walk], please?
  { match: '^(can|could|will|would) you (#Adverb|not)+? [(#Infinitive && @hasComma)] please$', group: 0, tag: 'Imperative', reason: 'req-verb-comma' },
  // can you [walk] the dog, please?
  { match: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] * @hasComma please$', group: 0, tag: 'Imperative', reason: 'req-obj-comma' },
  // [Will] walked home
  { match: '[(will && @isTitleCase)] #PastTense', group: 0, tag: 'FirstName', reason: 'will-past-subj' },
  // jack the ripper
  { match: '%Person|Verb% (the && #Person) #Person', tag: 'Person', reason: 'known-nickname' },
  // she drew a picture
  { match: '(drew && #Verb)', tag: 'PastTense', reason: 'drew-a-picture' },
  // keep the lid [closed]
  {
    match: '#Imperative #Determiner #Noun+ [%Adj|Past%]',
    group: 0,
    tag: 'Adjective',
    reason: 'lid-closed',
  }
]
// console.log('  ', rules.length, 'matches second-pass\n\n')

export default rules
