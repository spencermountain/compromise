module.exports = {
  Value: {
    notA: ['Noun', 'Verb', 'Adjective', 'Adverb'],
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
    isA: 'Cardinal',
    notA: ['Ordinal', 'TextValue'],
  },
  Fraction: {
    isA: 'Value',
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
