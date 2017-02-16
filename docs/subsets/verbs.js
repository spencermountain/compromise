module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().verbs().data()\n//[{text:''...}]`,
    returns: 'array'
  },
  conjugation: {
    desc: 'which form of is the verb in currently? PastTense, PresentTense, Infinitive, etc',
    returns: 'String',
    example: `nlp('My cat’s breath smells like cat food').verbs().conjugation() \n//['PresentTense']`
  },
  conjugate: {
    desc: 'she walked the walk',
    returns: 'Array',
    example: `nlp('').verbs().conjugate() \n//[{Infinitive:'walk', ...}]`
  },
  isNegative: {
    desc: '',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().isNegative().length() \n//0`
  },
  toNegative: {
    desc: 'make the verbs mean the opposite thing - `walk`->`did not walk` etc',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you have Lyme disease.').verbs().toNegative().out() \n//do not have`
  },
  toPositive: {
    desc: 'if the verb is negative, make it not negative',
    returns: 'Text',
    example: `nlp('Dear Miss Hoover, you do not have Lyme disease').verbs().toPositive().out() \n//have`
  },
  toPastTense: {
    desc: 'turn the verb into past tense - `walk`->`walked` etc.',
    returns: 'Text',
    example: `nlp('It tastes like burning.').verbs().toPastTense().out() \n//tasted`
  },
  toPresentTense: {
    desc: 'turn the verb into present tense - `walked`->`walks` etc.',
    returns: 'Text',
    example: `nlp('').verbs().toPresentTense().out() \n//`
  },
  toFutureTense: {
    desc: 'turn the verb into future tense - `walked`->`will walk` etc.',
    returns: 'Text',
    example: `nlp('I\'m a furniture! ').verbs().toFutureTense().out() \n//will be`
  },
  asAdjective: {
    desc: 'conjugate the verb to its adjectival form - `walk`->`walkable`',
    returns: 'Array',
    example: `nlp('strain').verbs().asAdjective() \n//strenuous`
  },
};
