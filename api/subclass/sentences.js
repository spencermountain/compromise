module.exports = {
  json: {
    desc: 'return a handy array of meta-data for the sentences in this text',
    example:
      "nlp('hi everybody! Hi Dr. Nick!').sentences().data().length\n//[{normal:'hi everybody'}, {normal:'hi dr nick'}]",
    returns: 'array',
  },
  prepend: {
    desc: "add a word (or words) at the beginning of these sentences, and move the sentnece's titlecase appropriately",
    returns: 'Doc',
    example:
      "nlp('I know so many words.').sentences().prepend('believe me').text()\n//Believe me, I know so many words.",
  },
  append: {
    desc: "add a word (or words) at the end of these sentences, and move the sentnece's punctuation appropriately",
    returns: 'Doc',
    example: "nlp('I know so many words.').sentences().append('big league').text()\n//I know so many words big league.",
  },
  toPastTense: {
    desc: 'transform the sentences so that they are in the past tense',
    returns: 'Doc',
    example: "nlp('I pay the Homer tax.').sentences().toPastTense().text()\n//I paid the Homer tax.",
  },
  toPresentTense: {
    desc: 'transform the sentences so that they are in the present tense',
    returns: 'Doc',
    example: "nlp('I paid the Homer tax.').sentences().toPresentTense().text()\n//I pay the Homer tax.",
  },
  toFutureTense: {
    desc: 'transform the sentences so that they are in the future tense',
    returns: 'Doc',
    example: "nlp('That’s the home-owner tax.').sentences().toFutureTense().text()\n//That will be the home-owner tax",
  },
  toContinuous: {
    desc: "like present tense, but still happening. ('walks'->'is walking')",
    returns: 'Doc',
    example: "nlp('rock and/or roll').sentences().toContinuous().text()\n//rocking and/or rolling",
  },
  toNegative: {
    desc: 'turn the sentence negative, so that it means the opposite thing',
    returns: 'Doc',
    example:
      "nlp('Now make like my pants, and split.').sentences(0).toNegative().text()\n//Now do not make like my pants, and split.",
  },
  toPositive: {
    desc: 'if the sentence is negatively-stated, make it say the opposite thing',
    returns: 'Doc',
    example: "nlp('The goggles do nothing!').sentences().toPositive().text()\n//The goggles do everything!",
  },
  isPassive: {
    desc: 'return only sentences that are passive-tense',
    returns: 'Doc',
    example: "nlp('you were saved by the bell').sentences().isPassive().text()\n//you were saved by the bell",
  },
  isQuestion: {
    desc: 'return only sentences that are questions',
    returns: 'Doc',
    example:
      "nlp('Dogs are funny. Are they funny? Yes they are.').sentences().isQuestion().out('array')\n//['are they funny']",
  },
  toExclamation: {
    desc: "replace the sentence's end punctuation with an exclamation point",
    returns: 'Doc',
    example: "nlp('sweet balls of fire?').sentences().toExclamation().text()\n//sweet balls of fire!",
  },
  toQuestion: {
    desc: 'turn the sentence into a question',
    returns: 'Doc',
    example: "nlp('Stupider like a fox.').sentences().toQuestion().text()\n//Stupider like a fox?",
  },
  toStatement: {
    desc: "turn the sentence into a statement. Replace it's end punctuation with a period",
    returns: 'Doc',
    example:
      "nlp('Go out on a Tuesday? Who am I, Charlie Sheen?').sentences(0).toStatement().text()\n//Go out on a Tuesday. Who am I, Charlie Sheen?",
  },
}
