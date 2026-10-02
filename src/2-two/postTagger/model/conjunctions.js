export default [
  // [so] he
  // left-right: { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' },
  // [how] he is driving
  ...['who', 'what', 'where', 'why', 'how', 'when'].map(word => ({
    match: `[${word}] #Noun #Copula #Adverb? (#Verb|#Adjective)`,
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  })),
  // is [when] he
  { match: '#Copula [(who|what|where|why|how|when)] #Noun', group: 0, tag: 'Conjunction', reason: 'when-he' },
  // says [that] he
  // left-right: { match: '#Verb [that] #Pronoun', group: 0, tag: 'Conjunction', reason: 'said-that-he' },
  // things [that] are required
  // left-right: { match: '#Noun [that] #Copula', group: 0, tag: 'Conjunction', reason: 'that-are' },
  // things [that] seem cool
  { match: '#Noun [that] #Verb #Adjective', group: 0, tag: 'Conjunction', reason: 'that-seem' },
  // he was [that] wide
  { match: '#Noun #Copula not? [that] #Adjective', group: 0, tag: 'Adverb', reason: 'that-adj' },
  // [to] the store - a determiner/possessive/pronoun opens a noun-phrase, so this 'to' is never an infinitive-marker
  // [to] the store
  { match: '[to] (#Determiner|#Possessive|#Pronoun|#Email|#Url)', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'to-the-store' },
  // [to] lunch
  { match: '[to] (#Noun && !#Verb)', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'to-noun' },
  // well [above] the clouds, directly [under] the bridge
  ...['above', 'below', 'under', 'over'].flatMap(prep => (
    ['well', 'just', 'right', 'directly'].map(word => ({
      match: `${word} [${prep}] (#Determiner|#Possessive|#Pronoun|#ProperNoun)`,
      group: 0, tag: 'Preposition', reason: `well-${prep}`,
    }))
  )),
  // I heard rumors [that] drivers save gas
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' },
  // Tuesday, [which] he liked
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-cop' },
  // treated them [like] sons
  { match: '(me|him|her|us|them|it) [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' },
  // [like] the time
  { match: '^[like] #Determiner', group: 0, tag: 'Preposition', reason: 'like-the' },
  // a day [like] this
  { match: 'a #Noun [like] (#Noun|#Determiner)', group: 0, tag: 'Preposition', reason: 'a-noun-like' },
  // really [like]
  { match: '(#Adverb && !lot) [like]', group: 0, tag: 'Verb', reason: 'really-like' },
  // nothing [like]
  // left-right: { match: 'nothing [like]', group: 0, tag: 'Preposition', reason: 'nothing-like' },
  // is not [like] me
  { match: '(#Copula|be|been|being) (not|never) [like]', group: 0, tag: 'Preposition', reason: 'neg-like' },
  // a lot [like] ours
  { match: 'a lot [like] #Noun', group: 0, tag: 'Preposition', reason: 'lot-like' },
  // treat them [like]
  { match: '#Infinitive #Pronoun [like]', group: 0, tag: 'Preposition', reason: 'treat-like' },
  // [before] dinner
  {
    match: '[before] (#Determiner|#Possessive|#Noun|#Gerund|#Date)',
    group: 0,
    tag: 'Preposition',
    reason: 'before-nominal',
  },




  // ==== Questions ====
  // where
  // why
  // when
  // who
  // whom
  // whose
  // what
  // which
  //the word 'how many'
  // { match: '^(how|which)', tag: 'QuestionWord', reason: 'how-q' },
  // [how] he
  { match: '[#QuestionWord] (#Pronoun|#Determiner)', group: 0, tag: 'Preposition', reason: 'how-he' },
  // [when] stolen
  { match: '[#QuestionWord] #Participle', group: 0, tag: 'Preposition', reason: 'when-stolen' },
  // [how] is
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // children [who] dance
  { match: '#Plural [(who|which|when)] .', group: 0, tag: 'Preposition', reason: 'people-who' },
]
