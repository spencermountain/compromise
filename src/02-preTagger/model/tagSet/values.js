export default {
  Value: {
    not: ['Verb', 'Adjective', 'Adverb'],
  },
  Ordinal: {
    is: 'Value',
    not: ['Cardinal'],
  },
  Cardinal: {
    is: 'Value',
    not: ['Ordinal'],
  },
  Fraction: {
    is: 'Value',
    not: ['Noun'],
  },
  RomanNumeral: {
    is: 'Cardinal',
    not: ['TextValue'],
  },
  TextValue: {
    is: 'Value',
    not: ['NumericValue'],
  },
  NumericValue: {
    is: 'Value',
    not: ['TextValue'],
  },
  Money: {
    is: 'Cardinal',
  },
  Percent: {
    is: 'Value',
  },
}
