import expandRules from './expand-rules.js'

const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adv+? not? (#V && !#Ger && !#Particle)'
const seatedQuestion = '^(which|what) #Adj+? #NN (did|does|do|#Mod) #Pron [sit] [on]$'

const rules = [
  // the very [professional] actor
  {
    m: '#Det (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    g: 0,
    t: 'Adj',
    r: 'degree-actor',
  },

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
    r: 'noun-list',
  })),

  // === connectors.js (second pass) ===
  // Before the meal ended, we left.
  // Before the meal, we left.
  // After the news that she resigned, we called.

  ...['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas'].flatMap(word => [
    // [before] she left
    // [after] she left
    // [since] she left...
    { m: `[${word}] ${subject} ${predicate}`, g: 0, t: 'Conj', r: `${word}-clause` },
    // [Before] the guests from the village arrived, we ate.
    // [After] the guests from the village arrived, we ate.
    // [Since] the guests from the village arrived, we ate. ...
    {
      m: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`,
      g: 0,
      t: 'Conj',
      r: `${word}-mod-subj`,
    },
  ]),
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    m: `^[${word}] ${subject} and ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
    r: `${word}-joint-subj`,
  })),
  // She bought flowers, [for] I was ill.
  { m: `@hasComma [for] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'causal-for' },

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...[
    'above',
    'below',
    'under',
    'over',
    'beside',
    'behind',
    'against',
    'outside',
    'inside',
    'near',
    'beneath',
    'underneath',
    'aboard',
  ].map(word => ({
    m: `[(${word} && !#V)] (#Det|#Poss|#Pron|#Prop)`,
    g: 0,
    t: 'Prep',
    r: `${word}-space-obj`,
  })),
  // She sings [like] her mother
  {
    m: '(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] (#NN|#Det|#Poss)',
    g: 0,
    t: 'Prep',
    r: 'like-like',
  },
  // She sings [like] her mother does
  {
    m: `(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
    r: 'manner-like',
  },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 0, u: 'PhrV', r: 'sit-q-unphr' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 1, t: 'Prep', r: 'sit-q-prep' },
  // “May twenty five”
  { m: '(#TxtNum && #Date) #TxtNum', t: 'Date', r: 'textvalue-date' },
  // he ate, and [left]
  {
    m: '(#Past && @hasComma) and [%Adj|Past%] #Adv+?$',
    g: 0,
    t: 'Past',
    r: 'past-list',
  },
  // does [this] work
  // Keep each auxiliary as a required hook.
  ...['do', 'does', 'did', '#Mod'].map(aux => ({
    m: `${aux} [(this|that|these|those)] #Adv+? #Inf`,
    hook: aux,
    g: 0,
    t: 'Pron',
    r: 'dem-q',
  })),
  // [This] is useful. Hope [this] helps. [This] really rocks.
  {
    m: '[this] #Adv+? (#Pres && !#Inf && !#Ger)',
    g: 0,
    t: 'Pron',
    r: 'this-finite-subj',
  },
  // { match: locative, group: 0, tag: 'Preposition', reason: 'subj-loc' },
  // { match: locative, group: 1, tag: 'Infinitive', reason: 'subj-loc-verb' },
  // being [injured] and treated
  {
    m: 'being #Adv+? [%Adj|Past%] (and|or) #Adv+? (#Past|#Part)',
    g: 0,
    t: 'Past',
    r: 'coord-pass',
  },
  // dogs, [including] the poodle
  {
    m: '(#NN && @hasComma) [including] all? #Det? #Card+? #Adv+? #Adj+? #NN',
    g: 0,
    t: 'Prep',
    r: 'including-list',
  },
  // can you [walk], please?
  {
    m: '^(can|could|will|would) you (#Adv|not)+? [(#Inf && @hasComma)] please$',
    g: 0,
    t: 'Imp',
    r: 'req-verb-comma',
  },
  // can you [walk] the dog, please?
  {
    m: '^(can|could|will|would) you (#Adv|not)+? [#Inf] * @hasComma please$',
    g: 0,
    t: 'Imp',
    r: 'req-obj-comma',
  },
  // [Will] walked home
  { m: '[(will && @isTitleCase)] #Past', g: 0, t: 'First', r: 'will-past-subj' },
  // jack the ripper
  { m: '%Person|Verb% (the && #Pers) #Pers', t: 'Pers', r: 'known-nickname' },
  // keep the lid [closed]
  {
    m: '#Imp #Det #NN+ [%Adj|Past%]',
    g: 0,
    t: 'Adj',
    r: 'lid-closed',
  },
  // console.log('  ', rules.length, 'matches second-pass\n\n')
]

export default expandRules(rules)
