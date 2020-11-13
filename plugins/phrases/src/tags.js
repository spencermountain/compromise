// Noun: 'blue',
// Verb: 'green',
// Negative: 'green',
// Date: 'red',
// Value: 'red',
// Adjective: 'magenta',
// Preposition: 'cyan',
// Conjunction: 'cyan',
// Determiner: 'cyan',
// Adverb: 'cyan',

module.exports = {
  Phrase: {},
  NounPhrase: {
    isA: 'Phrase',
    notA: ['VerbPhrase', 'AdjectivePhrase'],
    color: 'blue',
  },
  VerbPhrase: {
    isA: 'Phrase',
    notA: ['AdjectivePhrase', 'NounPhrase'],
    color: 'green',
  },
  AdjectivePhrase: {
    isA: 'Phrase',
    notA: ['VerbPhrase', 'NounPhrase'],
    color: 'magenta',
  },
}
