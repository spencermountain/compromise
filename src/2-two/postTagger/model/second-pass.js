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
  ...[
    ['%Noun|Verb%', '#Inf'],
    ['%Plural|Verb%', '#Pres'],
    ['thanks', '#Pres'],
  ].map(([target, verb]) => ({
    m: `(#NN && @hasComma) #NN (and|or) [(${target} && ${verb})]`,
    g: 0,
    t: 'NN',
    n: '#Cop',
  })),

  // === connectors.js (second pass) ===
  // Before the meal ended, we left.
  // Before the meal, we left.
  // After the news that she resigned, we called.

  ...['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas'].flatMap(word => [
    // [before] she left
    // [after] she left
    // [since] she left...
    {
      m: `[${word}] ${subject} ${predicate}`, g: 0, t: 'Conj',
      n: `${word} (#NN && !#Pron && !#Prop && !#Actor) #Prop`,
    },
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ...
    {
      m: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`,
      g: 0,
      t: 'Conj',
    },
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    m: `^[${word}] ${subject} and ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
  })),
  // She bought flowers, [for] I was ill.
  { m: `@hasComma [for] ${subject} ${predicate}`, g: 0, t: 'Conj' },

  // She sings [like] her mother
  {
    m: '(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] (#NN|#Det|#Poss)',
    g: 0,
    t: 'Prep',
  },
  // She sings [like] her mother does
  {
    m: `(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
  },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 0, u: 'PhrV' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 1, t: 'Prep' },
  // he ate, and [left]
  {
    m: '(#Past && @hasComma) and [%Adj|Past%] #Adv+?$',
    g: 0,
    t: 'Past',
  },
  // { match: locative, group: 0, tag: 'Preposition' },
  // { match: locative, group: 1, tag: 'Infinitive' },
  // being [injured] and treated
  {
    m: 'being #Adv+? [%Adj|Past%] (and|or) #Adv+? (#Past|#VBN)',
    g: 0,
    t: 'Past',
  },
  // dogs, [including] the poodle
  {
    m: '(#NN && @hasComma) [including] all? #Det? #Card+? #Adv+? #Adj+? #NN',
    g: 0,
    t: 'Prep',
  },
  // can you [walk], please?
  {
    m: '^(can|could|will|would) you (#Adv|not)+? [(#Inf && @hasComma)] please$',
    g: 0,
    t: 'Imp',
  },
  // can you [walk] the dog, please?
  {
    m: '^(can|could|will|would) you (#Adv|not)+? [#Inf] * @hasComma please$',
    g: 0,
    t: 'Imp',
  },
  // jack the ripper
  { m: '%Person|Verb% (the && #Pers) #Pers', t: 'Pers' },
  // keep the lid [closed]
  {
    m: '#Imp #Det #NN+ [%Adj|Past%]',
    g: 0,
    t: 'Adj',
  },
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

export default expandRules(rules)
