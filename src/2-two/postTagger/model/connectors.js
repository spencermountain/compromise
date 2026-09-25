// These rules need the predicates resolved by the main post-tagger sweep.
// Keep nominal subjects bounded: do not cross a comma, a relative clause, or
// another connector to find an unrelated verb later in the sentence.
const noun = '(#Noun && !#Possessive && !@hasComma)'
const modifiers = '(#Determiner|#Possessive)? #Adverb+? #Adjective+?'
const subject = `${modifiers} ${noun}+`
const predicate = '#Adverb+? not? (#Verb && !#Gerund && !#Particle)'

const clauses = ['before', 'after', 'since', 'until', 'till', 'as', 'than', 'when', 'whereas']
const rules = clauses.flatMap(word => [
  // after she left / after the very tired driver returned
  { match: `[${word}] ${subject} ${predicate}`, hook: word, group: 0, tag: 'Conjunction', reason: 'connector-finite-clause' },
  // after the guests from the village arrived
  { match: `[${word}] ${subject} (from|of|with|in|on|at|beside|near) ${subject} ${predicate}`, hook: word, group: 0, tag: 'Conjunction', reason: 'connector-modified-subject' },
])

export default [
  ...rules,
  // Causal for normally links clauses after punctuation; ordinary beneficiaries
  // and purpose phrases must remain prepositional.
  { match: `@hasComma [for] ${subject} ${predicate}`, hook: 'for', group: 0, tag: 'Conjunction', reason: 'causal-for' },
  { match: '(everyone|everybody|everything|anyone|anybody|anything|nobody|nothing|all) [but] (me|him|her|us|them|#Determiner|#Possessive|#ProperNoun)', hook: 'but', group: 0, tag: 'Preposition', reason: 'exceptive-but' },

  // Spatial complements, not predicative adjectives (the game is over) or
  // degree adverbs (near perfect). Keep verbs such as "near the coast" intact.
  ...['above', 'below', 'under', 'over', 'beside', 'behind', 'against', 'outside', 'inside', 'near'].map(word => ({
    match: `[(${word} && !#Verb)] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
    hook: word, group: 0, tag: 'Preposition', reason: 'spatial-object',
  })),
  { match: '#Verb [under] (#Determiner|#Possessive|#Pronoun)', hook: 'under', group: 0, tag: 'Preposition', reason: 'under-object' },

  // Resemblance after a lexical predicate; exclude auxiliaries/modals so
  // "would like" and "do like" keep the lexical verb.
  { match: '(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] (#Noun|#Determiner|#Possessive)', hook: 'like', group: 0, tag: 'Preposition', reason: 'resemblance-like' },
  // The comma distinguishes "Like his brother, ..." from "Like my page".
  { match: '^[like] (#Determiner|#Possessive)? #Adjective+? (#Noun && @hasComma)', hook: 'like', group: 0, tag: 'Preposition', reason: 'initial-resemblance' },
  // Require preceding predicate or punctuation: "I like her mother" stays Verb.
  { match: `(#Verb && !#Auxiliary && !#Modal && !do && !does && !did && !have && !has && !had) [like] ${subject} ${predicate}`, hook: 'like', group: 0, tag: 'Conjunction', reason: 'manner-like-clause' },
  { match: `@hasComma [like] ${subject} ${predicate}`, hook: 'like', group: 0, tag: 'Conjunction', reason: 'comma-like-clause' },

  // Content and relative clauses inside a prepositional object: do not retag
  // the outer preposition merely because a verb occurs inside this clause.
  { match: `#Noun [that] ${subject} ${predicate}`, hook: 'that', group: 0, tag: 'Conjunction', reason: 'noun-that-clause' },

  // No complement: temporal adverbs. Question-final before can instead be a
  // stranded preposition, so exclude questions from the general adverb rule.
  { match: '#Verb (#Determiner|#Possessive)? #Noun+? [(before|since)]$', hook: '#Verb', group: 0, tag: 'Adverb', notIf: '@hasQuestionMark', reason: 'temporal-adverb' },
  { match: '(shortly|soon|long) [after]$', hook: 'after', group: 0, tag: 'Adverb', reason: 'after-adverb' },
  { match: '(has|have|had) [since] #PastTense', hook: 'since', group: 0, tag: 'Adverb', reason: 'perfect-since-adverb' },
  { match: '#PastTense [yet]$', hook: 'yet', group: 0, tag: 'Adverb', reason: 'yet-adverb' },
  {
    match: '^(who|whom) #Verb #Pronoun #Verb [before]$',
    hook: 'before',
    group: 0,
    tag: 'Preposition',
    reason: 'stranded-before',
  },
  // will leave when the rain stops
  {
    match: '#Modal #Infinitive [when] #Determiner',
    hook: 'when',
    group: 0,
    tag: 'Conjunction',
    reason: 'will-leave-when',
  },
]
