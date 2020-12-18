// order matters
const list = [
  // ==== Mutliple tags ====
  { match: 'too much', tag: 'Adverb Adjective', reason: 'bit-4' },
  // u r cool
  { match: 'u r', tag: 'Pronoun Copula', reason: 'u r' },
  //sometimes adverbs - 'pretty good','well above'
  {
    match: '#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)',
    tag: '#Copula #Adverb #Adjective',
    reason: 'sometimes-adverb',
  },

  //i better ..
  { match: '(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense', group: 0, tag: 'Modal', reason: 'i-better' },
  //walking is cool
  { match: '[#Gerund] #Adverb? not? #Copula', group: 0, tag: 'Activity', reason: 'gerund-copula' },
  //walking should be fun
  { match: '[#Gerund] #Modal', group: 0, tag: 'Activity', reason: 'gerund-modal' },

  //swear-words as non-expression POS
  { match: 'holy (shit|fuck|hell)', tag: 'Expression', reason: 'swears-expression' },
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' },
  //'u' as pronoun
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },

  // ==== Determiners ====
  { match: '#Noun [(who|whom)]', group: 0, tag: 'Determiner', reason: 'captain-who' },
  //that car goes
  // { match: 'that #Noun [#PresentTense]', group: 0, tag: 'Determiner', reason: 'that-determiner' },
  { match: 'a bit much', tag: 'Determiner Adverb Adjective', reason: 'bit-3' },

  // ==== Propositions ====
  //all students
  { match: '#Verb #Adverb? #Noun [(that|which)]', group: 0, tag: 'Preposition', reason: 'that-prep' },
  //work, which has been done.
  { match: '@hasComma [which] (#Pronoun|#Verb)', group: 0, tag: 'Preposition', reason: 'which-copula' },
  { match: '#Copula just [like]', group: 0, tag: 'Preposition', reason: 'like-preposition' },
  //folks like her
  { match: '#Noun [like] #Noun', group: 0, tag: 'Preposition', reason: 'noun-like' },
  //fix for busted-up phrasalVerbs
  // { match: '#Noun [#Particle]', group: 0, tag: 'Preposition', reason: 'repair-noPhrasal' },

  // ==== Conditions ====
  // had he survived,
  { match: '[had] #Noun+ #PastTense', group: 0, tag: 'Condition', reason: 'had-he' },
  // were he to survive
  { match: '[were] #Noun+ to #Infinitive', group: 0, tag: 'Condition', reason: 'were-he' },

  // ==== Questions ====
  //the word 'how'
  { match: '^how', tag: 'QuestionWord', reason: 'how-question' },
  { match: '[how] (#Determiner|#Copula|#Modal|#PastTense)', group: 0, tag: 'QuestionWord', reason: 'how-is' },
  // //the word 'which'
  { match: '^which', tag: 'QuestionWord', reason: 'which-question' },
  // { match: '[which] . (#Noun)+ #Pronoun', group: 0, tag: 'QuestionWord', reason: 'which-question2' },
  // { match: 'which', tag: 'QuestionWord', reason: 'which-question3' },

  // ==== Conjunctions ====
  { match: '[so] #Noun', group: 0, tag: 'Conjunction', reason: 'so-conj' },
  //how he is driving
  {
    match: '[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)',
    group: 0,
    tag: 'Conjunction',
    reason: 'how-he-is-x',
  },
  // {
  //   match: '[(who|what|where|why|how|when)] #Noun #Adverb? #Infinitive not? #Gerund',
  //   group: 0,
  //   tag: 'Conjunction',
  //   reason: 'when-i-go-fishing',
  // },
]

module.exports = list
