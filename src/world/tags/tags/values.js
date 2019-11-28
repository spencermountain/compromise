module.exports = {
  Value: {
    notA: ['Verb', 'Adjective', 'Adverb'],
  },
  Ordinal: {
    isA: 'Value',
    notA: ['Cardinal'],
  },
  Cardinal: {
    isA: 'Value',
    notA: ['Ordinal'],
  },
  RomanNumeral: {
    isA: 'Cardinal', //can be a person, too
    notA: ['Ordinal', 'TextValue'],
  },
  TextValue: {
    isA: 'Value',
    notA: ['NumericValue'],
  },
  NumericValue: {
    isA: 'Value',
    notA: ['TextValue'],
  },
  Money: {
    isA: 'Cardinal',
  },
  Percent: {
    isA: 'Value',
  },
}
