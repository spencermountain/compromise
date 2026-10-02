// Before the meal ended, we left.
// Before the meal, we left.
// After the news that she resigned, we called.
const noun = '(#Noun && !#Possessive && !@hasComma)'
const modifiers = '(#Determiner|#Possessive)? #Adverb+? #Adjective+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adverb+? not? (#Verb && !#Gerund && !#Particle)'

const clauses = ['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas']
const rules = clauses.flatMap(word => [
  // [before] she left
  // [after] she left
  // [since] she left...
  { match: `[${word}] ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: `${word}-clause` },
  // [Before] the guests from the village arrived, we ate.
  // [After] the guests from the village arrived, we ate.
  // [Since] the guests from the village arrived, we ate. ...
  { match: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: `${word}-mod-subj` },
])

export default [
  ...rules,
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    match: `^[${word}] ${subject} and ${subject} ${predicate}`,
    group: 0, tag: 'Conjunction', reason: `${word}-joint-subj`,
  })),
  // She bought flowers, [for] I was ill.
  { match: `@hasComma [for] ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: 'causal-for' },
  // Everyone [but] me agreed.
  ...['everyone', 'everybody', 'everything', 'anyone', 'anybody', 'anything', 'nobody', 'nothing', 'all'].map(word => ({
    match: `${word} [but] (me|him|her|us|them|#Determiner|#Possessive|#ProperNoun)`,
    group: 0, tag: 'Preposition', reason: 'exceptive-but',
  })),

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near', 'beneath', 'underneath', 'aboard'].map(word => ({
    match: `[(${word} && !#Verb)] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
    group: 0, tag: 'Preposition', reason: `${word}-space-obj`,
  })),
  // We looked [under] the bed.
  { match: '#Verb [under] (#Determiner|#Possessive|#Pronoun)', group: 0, tag: 'Preposition', reason: 'under-obj' },
  // She sings [like] her mother
  { match: '(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] (#Noun|#Determiner|#Possessive)', group: 0, tag: 'Preposition', reason: 'like-like' },
  // images on a screen [like] humans do
  { match: '#Noun [like] #Noun+ (do|does|did)$', group: 0, tag: 'Preposition', reason: 'noun-like-cmp' },
  // cities [like] New York, Boston
  ...['', '#Place ', '#Place #Place '].map(prefix => ({
    match: `#Plural [like] ${prefix}(#Place && @hasComma) #Place`,
    group: 0, tag: 'Preposition', reason: 'like-place',
  })),
  // [Like] his brother, he enjoys chess
  { match: '^[like] (#Determiner|#Possessive)? #Adjective+? (#Noun && @hasComma)', group: 0, tag: 'Preposition', reason: 'init-like' },
  // She sings [like] her mother does
  { match: `(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: 'manner-like' },
  // I like tea, [like] my sister does.
  { match: `@hasComma [like] ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: 'comma-like-cl' },
  // We talked about the fact [that] she resigned.
  { match: `#Noun [that] ${subject} ${predicate}`, group: 0, tag: 'Conjunction', reason: 'noun-that' },
  // I have heard that story [before]
  { match: '#Verb (#Determiner|#Possessive)? #Noun+? [(before|since)]$', group: 0, tag: 'Adverb', notIf: '@hasQuestionMark', reason: 'time-adv' },
  // We met shortly [after].
  { match: '(shortly|soon|long) [after]$', group: 0, tag: 'Adverb', reason: 'after-adv' },
  // She has [since] moved.
  { match: '(has|have|had) [since] #PastTense', group: 0, tag: 'Adverb', reason: 'perf-since-adv' },
  // She has not arrived [yet].
  { match: '#PastTense [yet]$', group: 0, tag: 'Adverb', reason: 'yet-adv' },
  // Who did she arrive [before]?
  {
    match: '^(who|whom) #Verb #Pronoun #Verb [before]$',
    group: 0,
    tag: 'Preposition',
    reason: 'before-end',
  },
  // We will leave [when] the rain stops.
  {
    match: '#Modal #Infinitive [when] #Determiner',
    group: 0,
    tag: 'Conjunction',
    reason: 'leave-when',
  },
]
