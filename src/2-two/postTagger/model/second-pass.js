import { NN, Conj, Prep, Past, Pers, Adj, Imp, Phrasal } from '../../preTagger/tagSet/_lib.js'
import expandRules from './expand-rules.js'
import hangingAdverbs from './hanging-adverbs.js'
import { subject, predicate } from './_phrases.js'

// a lexical verb, not an auxiliary
const lexVerb = '(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had)'
const seatedQuestion = '^(which|what) #Adj+? #NN (did|does|do|#Mod) #Pron [sit] [on]$'

const rules = [
  ...hangingAdverbs,
  // === second-pass.js ===
  // Corrections matched against the main sweep's output, before any are applied.
  // 12 March Street → remove Date (but not '12 March road closures', or 'the 2011 film Drive')
  ['(#Val && !#Year) #Address+', null, { n: '(#Address && !@isTitleCase && !@isUpperCase)$', u: 'Date' }],
  // at 12 march street → remove Date
  ['at (#Val && !#Year) #Address+', null, { u: 'Date' }],
  // Keep comma context, but don't turn unambiguous verbs into list items.
  // food, drinks and [thanks] → Noun
  ...[
    ['%Noun|Verb%', '#Inf'],
    ['%Plural|Verb%', '#Pres'],
    ['thanks', '#Pres'],
  ].map(([target, verb]) => [`(#NN && @hasComma) #NN (and|or) [(${target} && ${verb})]`, NN, { n: '#Cop' }]),

  // === connectors.js (second pass) ===
  // Before the meal ended, we left.
  // Before the meal, we left.
  // After the news that she resigned, we called.

  ...['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas'].flatMap(word => [
    // [before] she left
    // [after] she left
    // [since] she left... → Conjunction
    [`[${word}] ${subject} ${predicate}`, Conj, { n: `${word} (#NN && !#Pron && !#Prop && !#Actor) #Prop` }],
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ... → Conjunction
    [`[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`, Conj],
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke... → Conjunction
  ...['before', 'after', 'until', 'when'].map(word => [`^[${word}] ${subject} and ${subject} ${predicate}`, Conj]),
  // She bought flowers, [for] I was ill. → Conjunction
  [`@hasComma [for] ${subject} ${predicate}`, Conj],

  // She sings [like] her mother → Preposition
  [`${lexVerb} [like] (#NN|#Det|#Poss)`, Prep],
  // She sings [like] her mother does → Conjunction
  [`${lexVerb} [like] ${subject} ${predicate}`, Conj],
  // Which chair did she [sit] on? → remove PhrasalVerb from sit
  [seatedQuestion, null, { u: Phrasal }],
  // Which chair did she sit [on]? → Preposition (second capture)
  [seatedQuestion, Prep, 1],
  // he ate, and [left] → PastTense
  ['(#Past && @hasComma) and [%Adj|Past%] #Adv+?$', Past],
  // { match: locative, group: 0, tag: 'Preposition' },
  // { match: locative, group: 1, tag: 'Infinitive' },
  // being [injured] and treated → PastTense
  ['being #Adv+? [%Adj|Past%] (and|or) #Adv+? (#Past|#VBN)', Past],
  // dogs, [including] the poodle → Preposition
  ['(#NN && @hasComma) [including] all? #Det? #Card+? #Adv+? #Adj+? #NN', Prep],
  // can you [walk], please? → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [(#Inf && @hasComma)] please$', Imp],
  // can you [walk] the dog, please? → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [#Inf] * @hasComma please$', Imp],
  // jack the ripper → Person
  ['%Person|Verb% (the && #Pers) #Pers', Pers],
  // President [Biden], President Hosni [Mubarak] → Person, for titles found in the main sweep
  // not 'Major [League]', or 'the President's [Cup]'
  ...['', '(#Prop && !#Hon && !#Poss && !@hasComma) '].map(first => [
    `#Hon ${first}[(#Prop && !#Hon && @isTitleCase)]`,
    Pers,
    0,
    { n: '(major|#Poss #Prop|@hasColon)', s: true },
  ]),
  // keep the lid [closed] → Adjective
  ['#Imp #Det #NN+ [%Adj|Past%]', Adj],
  // [twenty ten] km → not a year, once the unit is known
  ['[(twenty && #Year) #Year #Year?] #Unit', null, { u: 'Date' }],
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

export default expandRules(rules)
