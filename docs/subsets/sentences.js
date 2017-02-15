module.exports = {
  data: {
    desc: 'return a handy array of meta-data for this subset',
    example: `nlp().sentences().data()`,
    returns: 'array'
  },
  prepend: {
    desc: 'add a word (or words) at the beginning of these sentences, and move the sentnece\'s titlecase appropriately',
    returns: 'Text',
    example: `nlp('I know so many words.').sentences().prepend('believe me').out()//Believe me, I know so many words.`
  },
  append: {
    desc: 'add a word (or words) at the end of these sentences, and move the sentnece\'s punctuation appropriately',
    returns: 'Text',
    example: `nlp('I know so many words.').sentences().append('big league').out() //I know so many words big league.`
  },
  toPastTense: {
    desc: 'transform the sentences so that they are in the past tense',
    returns: 'Text',
    example: `nlp('I pay the Homer tax.').sentences().toPastTense().out()//I paid the Homer tax.`
  },
  toPresentTense: {
    desc: 'transform the sentences so that they are in the present tense',
    returns: 'Text',
    example: `nlp('I paid the Homer tax.').sentences().toPresentTense().out()//I pay the Homer tax.`
  },
  toFutureTense: {
    desc: 'transform the sentences so that they are in the future tense',
    returns: 'Text',
    example: `nlp('I pay the Homer tax.').sentences().toFutureTense().out()//I will pay the Homer tax.`
  },
  toNegative: {
    desc: 'turn the sentence negative, so that it means the opposite thing',
    returns: 'Text',
    example: `nlp('Now make like my pants, and split.').sentences(0).toNegative().out()//Now do not make like my pants, and split.`
  },
  toPositive: {
    desc: 'if the sentence is negatively-stated, make it say the opposite thing',
    returns: 'Text',
    example: `nlp('The goggles do nothing!').sentences().toPositive().out()//The goggles do everything!`
  },
  isPassive: {
    desc: 'return only sentences that are passive-tense',
    returns: 'Text',
    example: `nlp('you were saved by the bell').sentences().isPassive().out()//you were saved by the bell`
  },
  toExclamation: {
    desc: 'replace the sentence\'s end punctuation with an exclamation point',
    returns: 'Text',
    example: `nlp('sweet balls of fire?').sentences().toExclamation().out()//sweet balls of fire!`
  },
  toQuestion: {
    desc: 'turn the sentence into a question',
    returns: 'Text',
    example: `nlp('Stupider like a fox.').sentences().toQuestion().out()//Stupider like a fox?`
  },
  toStatement: {
    desc: 'turn the sentence into a statement. Replace it\'s end punctuation with a period',
    returns: 'Text',
    example: `nlp('Go out on a Tuesday? Who am I, Charlie Sheen?').sentences(0).toStatement().out()//Go out on a Tuesday. Who am I, Charlie Sheen?`
  }
};
