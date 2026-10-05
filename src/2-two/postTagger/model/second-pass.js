import expandRules from './expand-rules.js'

const noun = '(#NN && !#Poss && !@hasComma)'
const modifiers = '(#Det|#Poss)? #Adv+? #Adj+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adv+? not? (#V && !#Ger && !#Prt)'
const seatedQuestion = '^(which|what) #Adj+? #NN (did|does|do|#Mod) #Pron [sit] [on]$'

const rules = [
  // === second-pass.js ===
  // Corrections matched against the main sweep's output, before any are applied.
  // const locative = '#Plural [(near|on|under|beside|behind)] #Determiner #Adjective+? #Noun [%Noun|Verb%]$'

  // Which chair did she [sit] [on]?

  // veggies, [like] kale
  {
    m: '(#NN && @hasComma) [like] #NN',
    g: 0,
    t: 'Prep',
    r: 'comma-like-ex',
  },
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
  // Everyone [but] me agreed.
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => ({
    m: `${word} [but] (me|him|her|us|them|#Det|#Poss|#Prop)`,
    g: 0,
    t: 'Prep',
    r: 'exceptive-but',
  })),

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near'].map(word => ({
    m: `[(${word} && !#V)] (#Det|#Poss|#Pron|#Prop)`,
    g: 0,
    t: 'Prep',
    r: `${word}-space-obj`,
  })),
  // We looked [under] the bed.
  { m: '#V [under] (#Det|#Poss|#Pron)', g: 0, t: 'Prep', r: 'under-obj' },
  // She sings [like] her mother
  {
    m: '(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] (#NN|#Det|#Poss)',
    g: 0,
    t: 'Prep',
    r: 'like-like',
  },
  // images on a screen [like] humans do
  { m: '#NN [like] #NN+ (do|does|did)$', g: 0, t: 'Prep', r: 'noun-like-cmp' },
  // cities [like] New York, Boston
  ...['', '#Place ', '#Place #Place '].map(prefix => ({
    m: `#Plur [like] ${prefix}(#Place && @hasComma) #Place`,
    g: 0,
    t: 'Prep',
    r: 'like-place',
  })),
  // [Like] his brother, he enjoys chess
  {
    m: '^[like] (#Det|#Poss)? #Adj+? (#NN && @hasComma)',
    g: 0,
    t: 'Prep',
    r: 'init-like',
  },
  // She sings [like] her mother does
  {
    m: `(#V && !#Aux && !#Mod && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`,
    g: 0,
    t: 'Conj',
    r: 'manner-like',
  },
  // I like tea, [like] my sister does.
  { m: `@hasComma [like] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'comma-like-cl' },
  // We talked about the fact [that] she resigned.
  { m: `#NN [that] ${subject} ${predicate}`, g: 0, t: 'Conj', r: 'noun-that' },
  // I have heard that story [before]
  {
    m: '#V (#Det|#Poss)? #NN+? [(before|since)]$',
    g: 0,
    t: 'Adv',
    n: '@hasQuestionMark',
    r: 'time-adv',
  },
  // We met shortly [after].
  { m: '(shortly|soon|long) [after]$', g: 0, t: 'Adv', r: 'after-adv' },
  // She has [since] moved.
  { m: '(has|have|had) [since] #Past', g: 0, t: 'Adv', r: 'perf-since-adv' },
  // She has not arrived [yet].
  { m: '#Past [yet]$', g: 0, t: 'Adv', r: 'yet-adv' },
  // Who did she arrive [before]?
  {
    m: '^(who|whom) #V #Pron #V [before]$',
    g: 0,
    t: 'Prep',
    r: 'before-end',
  },
  // We will leave [when] the rain stops.
  {
    m: '#Mod #Inf [when] #Det',
    g: 0,
    t: 'Conj',
    r: 'leave-when',
  },

  // Possession of running water and enduring noun phrases are not progressives.
  { m: '[(have|has|had)] running water', g: 0, u: 'Aux', r: 'have-water' },
  { m: '[#Cop] (enduring && #Adj) #NN', g: 0, u: 'Aux', r: 'enduring-cop' },
  // Although he [was] [tired], he smiled. He [was] [tired].
  ...[
    // He [was] [tired].
    { match: '[(#Cop|been)] #Adv+? [tired]$', position: 'end' },
    // Although he [was] [tired], he smiled.
    { match: '[(#Cop|been)] #Adv+? [(tired && @hasComma)]', position: 'comma' },
  ].flatMap(({ match, position }) => [
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, t: 'Cop', u: 'Pass', r: `tired-${position}-cop` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 0, u: 'Aux', r: `tired-${position}-unaux` },
    // Although he [was] [tired], he smiled. He [was] [tired].
    { m: match, g: 1, t: 'Adj', r: `tired-${position}-adj` },
  ]),
  // had been tired
  { m: '(has|have|had) (#Adv|not)+? been #Adv+? tired$', u: 'Pass', r: 'tired-unpass' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 0, u: 'PhrV', r: 'sit-q-unphr' },
  // Which chair did she [sit] [on]? What cushion can he [sit] [on]?
  { m: seatedQuestion, g: 1, t: 'Prep', r: 'sit-q-prep' },
  // “May twenty five”
  { m: '(#TxtNum && #Date) #TxtNum', t: 'Date', r: 'textvalue-date' },
  // 23 Main Street in Toronto
  { m: '#Address in #Place', t: 'Place', r: 'address-place' },
  // the very [professional] actor
  {
    m: '#Det (very|remarkably|extremely|quite|unusually) [%Adj|Noun%] #Actor',
    g: 0,
    t: 'Adj',
    r: 'degree-actor',
  },
  // the [sleeping] dog
  {
    m: '#Det [sleeping] (#Actor|#Pers|puppy|kitten|dog|cat|baby|babies|child|children)',
    g: 0,
    t: 'Adj',
    r: 'sleeping-mod',
  },
  // he ate, and [left]
  {
    m: '(#Past && @hasComma) and [%Adj|Past%] #Adv+?$',
    g: 0,
    t: 'Past',
    r: 'past-list',
  },
  // [water] broke the pipe
  {
    m: '^[%Noun|Verb%] #Past (#Det|#Poss) #Adj+? #NN',
    g: 0,
    t: 'NN',
    r: 'bare-subj-past',
  },
  // the [present] immediately
  { m: '#Det [present] #Adv+$', g: 0, t: 'NN', r: 'present-obj' },
  // [falls in] June
  { m: '[(fall|falls|fell) in] #Month', g: 0, t: '#V #Prep', r: 'fall-in-month' },
  // [had] he walked
  {
    m: '^[had] #NN+ (#Adv|not)+? #Past',
    g: 0,
    t: 'Condition',
    r: 'had-cond',
    n: '@hasQuestionMark',
  },
  // [were] he to walk
  {
    m: '^[were] #NN+ to #Inf *$',
    g: 0,
    t: 'Condition',
    r: 'were-he',
    n: '@hasQuestionMark',
  },
  // [had] he walked?
  {
    m: '^[had] #NN+ (#Adv|not)+? (#Past && @hasQuestionMark)$',
    g: 0,
    t: 'Aux',
    r: 'had-q-end',
    n: '@hasComma',
  },
  // [had] he walked the dog?
  {
    m: '^[had] #NN+ (#Adv|not)+? #Past * @hasQuestionMark$',
    g: 0,
    t: 'Aux',
    r: 'had-q-obj',
    n: '@hasComma',
  },
  // then, [had] he walked
  {
    m: '@hasComma [had] #NN+ (#Adv|not)+? #Past',
    g: 0,
    t: 'Condition',
    r: 'had-comma-cond',
    n: '@hasQuestionMark',
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
  // [This] will be one sentence. [This] might help.
  { m: '[this] #Adv+? #Mod #Adv+? #Inf', g: 0, t: 'Pron', r: 'this-modal-subj' },
  // has [read], had [put]
  ...['read', 'put'].map(word => ({
    m: `(has|have|had) (#Adv|not)+? [${word}]`,
    g: 0,
    t: 'Part',
    r: 'perf-invar',
  })),
  // what [work] he did
  { m: '(which|what|whose) [%Noun|Verb%] #Pron', g: 0, t: 'NN', r: 'embed-wh-obj' },
  // what [walks] he took
  { m: '(which|what|whose) [%Plural|Verb%] #Pron', g: 0, t: 'Plur', r: 'embed-wh-pl' },
  // John and Mary [walk]
  {
    m: '#Pers and #Pers [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$',
    g: 0,
    t: 'Inf',
    r: 'joint-subj-verb',
  },
  // dogs [near] the house [bark]
  // near|on|under|beside|behind
  ...['near', 'on', 'under', 'beside', 'behind'].flatMap(word => [
    {
      m: `#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`,
      g: 0,
      t: 'Prep',
      r: 'subj-loc',
    },
    {
      m: `#Plur [${word}] #Det #Adj+? #NN [%Noun|Verb%]$`,
      g: 1,
      t: 'Inf',
      r: 'subj-loc-verb',
    },
  ]),
  // { match: locative, group: 0, tag: 'Preposition', reason: 'subj-loc' },
  // { match: locative, group: 1, tag: 'Infinitive', reason: 'subj-loc-verb' },
  // being [injured] and treated
  {
    m: 'being #Adv+? [%Adj|Past%] (and|or) #Adv+? (#Past|#Part)',
    g: 0,
    t: 'Past',
    r: 'coord-pass',
  },
  // has eaten and [drunk]
  {
    m: '(has|have|had) (#Adv|not)+? #Past (and|or) #Adv+? [drunk]',
    g: 0,
    t: 'Part',
    r: 'coord-drunk',
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
  // she drew a picture
  { m: '(drew && #V)', t: 'Past', r: 'drew-a-picture' },
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
