export default [
  // ==== Questions ====
  //the word 'how'
  { match: '^how', tag: 'QuestionWord', reason: 'how-question' },
  // how is
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // the word 'which'
  { match: '^which', tag: 'QuestionWord', reason: 'which-question' },
  // ==== Conjunctions ====
  { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' },
  //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  // when he
  { match: '#Copula [(who|what|where|why|how|when)] #Noun', group: 0, tag: 'Conjunction', reason: 'when-he' },
  // says that he..
  { match: '#Verb [that] #Pronoun', group: 0, tag: 'Conjunction', reason: 'said-that-he' },
  // things that are required
  { match: '#Noun [that] #Copula', group: 0, tag: 'Conjunction', reason: 'that-are' },
  // things that seem cool
  { match: '#Noun [that] #Verb #Adjective', group: 0, tag: 'Conjunction', reason: 'that-seem' },
  // wasn't that wide..
  { match: '#Noun #Copula not? [that] #Adjective', group: 0, tag: 'Adverb', reason: 'that-adj' },

  // ==== Prepositions ====
  //all students
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' },
  //work, which has been done.
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-copula' },
  { match: '#Copula just [like]', group: 0, tag: 'Preposition', reason: 'like-preposition' },
  //folks like her
  { match: '#Plural [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' },
]
