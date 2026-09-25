export default [
  // so he
  { match: '[so] #Noun', hook: 'so', group: 0, tag: 'Conjunction', reason: 'so-conj' },
  // how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)', hook: '#Copula',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  // is when he
  { match: '#Copula [(who|what|where|why|how|when)] #Noun', hook: '#Copula', group: 0, tag: 'Conjunction', reason: 'when-he' },
  // says that he
  { match: '#Verb [that] #Pronoun', hook: 'that', group: 0, tag: 'Conjunction', reason: 'said-that-he' },
  // things that are required
  { match: '#Noun [that] #Copula', hook: 'that', group: 0, tag: 'Conjunction', reason: 'that-are' },
  // things that seem cool
  { match: '#Noun [that] #Verb #Adjective', hook: 'that', group: 0, tag: 'Conjunction', reason: 'that-seem' },
  // he was that wide
  { match: '#Noun #Copula not? [that] #Adjective', hook: 'that', group: 0, tag: 'Adverb', reason: 'that-adj' },
  //to the store - a determiner/possessive/pronoun opens a noun-phrase, so this 'to' is never an infinitive-marker
  // to the store
  { match: '[to] (#Determiner|#Possessive|#Pronoun|#Email|#Url)', hook: 'to', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'to-the-store' },
  // to lunch
  { match: '[to] (#Noun && !#Verb)', hook: 'to', group: 0, unTag: 'Conjunction', tag: 'Preposition', reason: 'to-noun' },
  // well above the clouds
  { match: '(well|just|right|directly) [above] (#Determiner|#Possessive|#Pronoun|#ProperNoun)', hook: 'above', group: 0, tag: 'Preposition', reason: 'well-above' },
  // well below the clouds
  { match: '(well|just|right|directly) [below] (#Determiner|#Possessive|#Pronoun|#ProperNoun)', hook: 'below', group: 0, tag: 'Preposition', reason: 'well-below' },
  // well under the clouds
  { match: '(well|just|right|directly) [under] (#Determiner|#Possessive|#Pronoun|#ProperNoun)', hook: 'under', group: 0, tag: 'Preposition', reason: 'well-under' },
  // well over the clouds
  { match: '(well|just|right|directly) [over] (#Determiner|#Possessive|#Pronoun|#ProperNoun)', hook: 'over', group: 0, tag: 'Preposition', reason: 'well-over' },
  // I heard rumors that drivers save gas
  { match: '#Verb #Adverb? #Noun [(that|which)]', hook: '#Verb', group: 0, tag: 'Preposition', reason: 'that-prep' },
  // Tuesday, which he liked
  { match: '@hasComma [which] (#Pronoun|#Verb)', hook: 'which', group: 0, tag: 'Preposition', reason: 'which-copula' },
  //folks like her — subject-only pronouns instead introduce the verb.
  // folks like her
  { match: '(#Noun && !i && !he && !she && !we && !they) [like] #Noun', hook: 'like', group: 0, tag: 'Preposition', reason: 'noun-like' },
  // like the time
  { match: '^[like] #Determiner', hook: 'like', group: 0, tag: 'Preposition', reason: 'like-the' },
  // a day like this
  { match: 'a #Noun [like] (#Noun|#Determiner)', hook: 'like', group: 0, tag: 'Preposition', reason: 'a-noun-like' },
  // really like
  { match: '#Adverb [like]', hook: 'like', group: 0, tag: 'Verb', reason: 'really-like' },
  // nothing like
  { match: '(not|nothing|never) [like]', hook: 'like', group: 0, tag: 'Preposition', reason: 'nothing-like' },
  // treat them like
  { match: '#Infinitive #Pronoun [like]', hook: 'like', group: 0, tag: 'Preposition', reason: 'treat-them-like' },
  // before dinner
  {
    match: '[before] (#Determiner|#Possessive|#Noun|#Gerund|#Date)',
    hook: 'before',
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
  // { match: '^(how|which)', tag: 'QuestionWord', reason: 'how-question' },
  // how he
  { match: '[#QuestionWord] (#Pronoun|#Determiner)', hook: '#QuestionWord', group: 0, tag: 'Preposition', reason: 'how-he' },
  // when stolen
  { match: '[#QuestionWord] #Participle', hook: '#QuestionWord', group: 0, tag: 'Preposition', reason: 'when-stolen' },
  // how is
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', hook: 'how', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // children who dance
  { match: '#Plural [(who|which|when)] .', hook: '#Plural', group: 0, tag: 'Preposition', reason: 'people-who' },
]
