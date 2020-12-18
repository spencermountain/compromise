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
  Fraction: {
    isA: 'Value',
    notA: ['Ordinal', 'Noun'],
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
