module.exports = {
  // Phrase: {},
  NounPhrase: {
    // isA: 'Phrase',
    notA: ['VerbPhrase', 'AdjectivePhrase'],
    color: 'blue',
  },
  VerbPhrase: {
    // isA: 'Phrase',
    notA: ['AdjectivePhrase', 'NounPhrase'],
    color: 'green',
  },
  AdjectivePhrase: {
    // isA: 'Phrase',
    notA: ['VerbPhrase', 'NounPhrase'],
    color: 'magenta',
  },
  Subordinate: {
    // isA: 'Phrase',
    notA: [],
    // color: '',
  },
}
