module.exports = {
  Phrase: {},
  NounPhrase: {
    isA: 'Phrase',
    notA: ['VerbPhrase'],
    color: 'blue',
  },
  VerbPhrase: {
    isA: 'Phrase',
    notA: ['NounPhrase'],
    color: 'green',
  },
  // AdjectivePhrase: {
  //   isA: 'Phrase',
  //   notA: ['VerbPhrase', 'NounPhrase'],
  //   color: 'magenta',
  // },
}
