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
  { match: `[${word}] ${subject} ${predicate}`, hook: word, group: 0, tag: 'Conjunction', reason: `${word}-clause` },
  // [Before] the guests from the village arrived, we ate.
  // [After] the guests from the village arrived, we ate.
  // [Since] the guests from the village arrived, we ate. ...
  { match: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`, hook: word, group: 0, tag: 'Conjunction', reason: `${word}-modified-subject` },
])

export default [
  ...rules,
  // [Before] the dog and the cat woke, she left.
  // [before] the dog and the cat woke
  // [after] the dog and the cat woke...
  ...['before', 'after', 'until', 'when', 'while'].map(word => ({
    match: `^[${word}] ${subject} and ${subject} ${predicate}`,
    hook: word, group: 0, tag: 'Conjunction', reason: `${word}-joint-subject`,
  })),
  // She bought flowers, [for] I was ill.
  { match: `@hasComma [for] ${subject} ${predicate}`, hook: 'for', group: 0, tag: 'Conjunction', reason: 'causal-for' },
  // Everyone [but] me agreed.
  { match: '(everyone|everybody|everything|anyone|anybody|anything|nobody|nothing|all) [but] (me|him|her|us|them|#Determiner|#Possessive|#ProperNoun)', hook: 'but', group: 0, tag: 'Preposition', reason: 'exceptive-but' },

  // The cat slept [under] the table. He sat [beside] me.
  // the plane flew well [above] the clouds
  // she stood directly [below] the window...
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near'].map(word => ({
    match: `[(${word} && !#Verb)] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
    hook: word, group: 0, tag: 'Preposition', reason: `${word}-spatial-object`,
  })),
  // We looked [under] the bed.
  { match: '#Verb [under] (#Determiner|#Possessive|#Pronoun)', hook: 'under', group: 0, tag: 'Preposition', reason: 'under-object' },
  // She sings [like] her mother
  { match: '(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] (#Noun|#Determiner|#Possessive)', hook: 'like', group: 0, tag: 'Preposition', reason: 'resemblance-like' },
  // [Like] his brother, he enjoys chess
  { match: '^[like] (#Determiner|#Possessive)? #Adjective+? (#Noun && @hasComma)', hook: 'like', group: 0, tag: 'Preposition', reason: 'initial-resemblance' },
  // She sings [like] her mother does
  { match: `(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`, hook: 'like', group: 0, tag: 'Conjunction', reason: 'manner-like-clause' },
  // I like tea, [like] my sister does.
  { match: `@hasComma [like] ${subject} ${predicate}`, hook: 'like', group: 0, tag: 'Conjunction', reason: 'comma-like-clause' },
  // We talked about the fact [that] she resigned.
  { match: `#Noun [that] ${subject} ${predicate}`, hook: 'that', group: 0, tag: 'Conjunction', reason: 'noun-that-clause' },
  // I have heard that story [before]
  { match: '#Verb (#Determiner|#Possessive)? #Noun+? [(before|since)]$', hook: '#Verb', group: 0, tag: 'Adverb', notIf: '@hasQuestionMark', reason: 'temporal-adverb' },
  // We met shortly [after].
  { match: '(shortly|soon|long) [after]$', hook: 'after', group: 0, tag: 'Adverb', reason: 'after-adverb' },
  // She has [since] moved.
  { match: '(has|have|had) [since] #PastTense', hook: 'since', group: 0, tag: 'Adverb', reason: 'perfect-since-adverb' },
  // She has not arrived [yet].
  { match: '#PastTense [yet]$', hook: 'yet', group: 0, tag: 'Adverb', reason: 'yet-adverb' },
  // Who did she arrive [before]?
  {
    match: '^(who|whom) #Verb #Pronoun #Verb [before]$',
    hook: 'before',
    group: 0,
    tag: 'Preposition',
    reason: 'stranded-before',
  },
  // We will leave [when] the rain stops.
  {
    match: '#Modal #Infinitive [when] #Determiner',
    hook: 'when',
    group: 0,
    tag: 'Conjunction',
    reason: 'will-leave-when',
  },
]
