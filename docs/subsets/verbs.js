'use strict';

module.exports = {
  data: {
    desc: 'return a handy array of meta-data for the verbs and their auxillaries in this text',
    example: 'nlp(\'he will have been walking quickly\').verbs().data()\n//[{verb:\'walking\', auxillary:\'will have been\', adverb:\'quickly\'}]\n',
    returns: 'array'
  },
  conjugation: {
    desc: 'which form of is the verb in currently? PastTense, PresentTense, Infinitive, etc',
    returns: 'String',
    example: 'nlp(\'My cat\u2019s breath smells like cat food\').verbs().conjugation()\n//[\'PresentTense\']\n'
  },
  conjugate: {
    desc: 'blast-out all conjugated forms of these verbs',
    returns: 'Array',
    example: 'nlp(\'she walked the walk\').verbs().conjugate()\n//[{Infinitive:\'walk\', ...}]\n'
  },

  isSingular: {
    desc: 'return only the verbs that are singular, like \'is\' but not \'are\'',
    returns: 'Text',
    example: 'nlp(\'we were discussing Wittgenstein over a game of backgammon\').verbs().isSingular().out(\'array\')\n//[{text:\'were discussing\'}]\n'
  },
  isPlural: {
    desc: 'return only the verbs that are plural, like \'are\' but not \'is\'',
    returns: 'Text',
    example: 'nlp(\'We were sitting in Barney\u2019s car\').verbs().isPlural().out(\'array\')\n//[]\n'
  },

  isPositive: {
    desc: 'return only the verbs that are not negative, like \'would sing\' but not \'would not sing\'',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().isPositive().length\n    //1\n    '
  },
  isNegative: {
    desc: 'return only the verbs that are negative, like \'would not sing\' but not \'would sing\'',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().isNegative().length\n//0\n'
  },
  toNegative: {
    desc: 'make the verbs mean the opposite thing - `walk`->`did not walk` etc',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you have Lyme disease.\').verbs().toNegative().out()\n//do not have\n'
  },
  toPositive: {
    desc: 'if the verb is negative, make it not negative',
    returns: 'Text',
    example: 'nlp(\'Dear Miss Hoover, you do not have Lyme disease\').verbs().toPositive().out()\n//have\n'
  },
  toPastTense: {
    desc: 'turn the verb into past tense - `walk`->`walked` etc.',
    returns: 'Text',
    example: 'nlp(\'It tastes like burning.\').verbs().toPastTense().out()\n//tasted\n'
  },
  toPresentTense: {
    desc: 'turn the verb into present tense - `walked`->`walks` etc.',
    returns: 'Text',
    example: 'nlp(\'you ate the sandwich?\').verbs().toPresentTense().out()\n//you eat the sandwich?\n'
  },
  toFutureTense: {
    desc: 'turn the verb into future tense - `walked`->`will walk` etc.',
    returns: 'Text',
    example: 'nlp(\'I\u2019m a furniture! \').verbs().toFutureTense().out()\n//will be'
  },
  asAdjective: {
    desc: 'conjugate the verb to its adjectival form - `walk`->`walkable`',
    returns: 'Array',
    example: 'nlp(\'strain\').verbs().asAdjective()\n//strenuous'
  }
};
