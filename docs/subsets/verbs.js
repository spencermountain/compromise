module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the verbs and their auxillaries in this text',
    example: `nlp('he will have been walking quickly').verbs().data()
//[{verb:'walking', auxillary:'will have been', adverb:'quickly'}]
`,
    returns: 'array'
  },
  conjugation: {
    desc: 'which form of is the verb in currently? PastTense, PresentTense, Infinitive, etc',
    returns: 'String',
    example: `nlp('My cat’s breath smells like cat food').verbs().conjugation()
//['PresentTense']
`
  },
  conjugate: {
    desc: 'she walked the walk',
    returns: 'Array',
    example: `nlp('').verbs().conjugate()
//[{Infinitive:'walk', ...}]
`
  },

  isSingular: {
    desc: 'return only the verbs that are singular, like \'is\' but not \'are\'',
    returns: 'Text',
    example: `nlp('we were discussing Wittgenstein over a game of backgammon').verbs().isSingular().out('array')
//[{text:'were discussing'}]
`
  },
  isPlural: {
    desc: 'return only the verbs that are plural, like \'are\' but not \'is\'',
    returns: 'Text',
    example: `nlp('We were sitting in Barney's car').verbs().isPlural().out('array')
//[]
`
  },

  isPositive: {
    desc: 'return only the verbs that are not negative, like \'would sing\' but not \'would not sing\'',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().isNegative().length()
    //1
    `
  },
  isNegative: {
    desc: 'return only the verbs that are negative, like \'would not sing\' but not \'would sing\'',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().isNegative().length()
//0
`
  },
  toNegative: {
    desc: 'make the verbs mean the opposite thing - `walk`->`did not walk` etc',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().toNegative().out()
//do not have
`
  },
  toPositive: {
    desc: 'if the verb is negative, make it not negative',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you do not have Lyme disease').verbs().toPositive().out()
//have
`
  },
  toPastTense: {
    desc: 'turn the verb into past tense - `walk`->`walked` etc.',
    returns: 'Text',
    example: `nlp('It tastes like burning.').verbs().toPastTense().out()
//tasted
`
  },
  toPresentTense: {
    desc: 'turn the verb into present tense - `walked`->`walks` etc.',
    returns: 'Text',
    example: `nlp('you ate the sandwich?').verbs().toPresentTense().out()
//you eat the sandwich?
`
  },
  toFutureTense: {
    desc: 'turn the verb into future tense - `walked`->`will walk` etc.',
    returns: 'Text',
    example: `nlp('I'm a furniture! ').verbs().toFutureTense().out()
//will be`
  },
  asAdjective: {
    desc: 'conjugate the verb to its adjectival form - `walk`->`walkable`',
    returns: 'Array',
    example: `nlp('strain').verbs().asAdjective()
//strenuous`
  },
};
