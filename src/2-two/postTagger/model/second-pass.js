import { NN, Conj, Prep, Past, Pers, Adj } from '../../preTagger/tagSet/_lib.js'
import expandRules from './expand-rules.js'
import hangingAdverbs from './hanging-adverbs.js'

const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adv+? not? (#V && !#Ger && !#Particle)'
const seatedQuestion = '^(which|what) #Adj+? #NN (did|does|do|#Mod) #Pron [sit] [on]$'

const rules = [
  ...hangingAdverbs,
  // === second-pass.js ===
  // Corrections matched against the main sweep's output, before any are applied.
  // Keep comma context, but don't turn unambiguous verbs into list items.
  // food, drinks and [thanks] → Noun
  ...[
    ['%Noun|Verb%', '#Inf'],
    ['%Plural|Verb%', '#Pres'],
    ['thanks', '#Pres'],
  ].map(([target, verb]) => [`(#NN && @hasComma) #NN (and|or) [(${target} && ${verb})]`, NN, 0, { n: '#Cop' }]),

  // === connectors.js (second pass) ===
  // Before the meal ended, we left.
  // Before the meal, we left.
  // After the news that she resigned, we called.

  ...['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas'].flatMap(word => [
    // [before] she left
    // [after] she left
    // [since] she left... → Conjunction
    [`[${word}] ${subject} ${predicate}`, Conj, 0, { n: `${word} (#NN && !#Pron && !#Prop && !#Actor) #Prop` }],
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ... → Conjunction
    [`[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`, Conj, 0],
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke... → Conjunction
  ...['before', 'after', 'until', 'when', 'while'].map(word => [`^[${word}] ${subject} and ${subject} ${predicate}`, Conj, 0]),
  // She bought flowers, [for] I was ill. → Conjunction
  [`@hasComma [for] ${subject} ${predicate}`, Conj, 0],

  // She sings [like] her mother → Preposition
  ['(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] (#NN|#Det|#Poss)', Prep, 0],
  // She sings [like] her mother does → Conjunction
  [`(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`, Conj, 0],
  // Which chair did she [sit] on? → remove PhrasalVerb from sit
  [seatedQuestion, null, 0, { u: 'PhrV' }],
  // Which chair did she sit [on]? → Preposition (second capture)
  [seatedQuestion, Prep, 1],
  // he ate, and [left] → PastTense
  ['(#Past && @hasComma) and [%Adj|Past%] #Adv+?$', Past, 0],
  // { match: locative, group: 0, tag: 'Preposition' },
  // { match: locative, group: 1, tag: 'Infinitive' },
  // being [injured] and treated → PastTense
  ['being #Adv+? [%Adj|Past%] (and|or) #Adv+? (#Past|#VBN)', Past, 0],
  // dogs, [including] the poodle → Preposition
  ['(#NN && @hasComma) [including] all? #Det? #Card+? #Adv+? #Adj+? #NN', Prep, 0],
  // can you [walk], please? → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [(#Inf && @hasComma)] please$', 'Imp', 0],
  // can you [walk] the dog, please? → Imperative
  ['^(can|could|will|would) you (#Adv|not)+? [#Inf] * @hasComma please$', 'Imp', 0],
  // jack the ripper → Person
  ['%Person|Verb% (the && #Pers) #Pers', Pers],
  // keep the lid [closed] → Adjective
  ['#Imp #Det #NN+ [%Adj|Past%]', Adj, 0],
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

export default expandRules(rules)
