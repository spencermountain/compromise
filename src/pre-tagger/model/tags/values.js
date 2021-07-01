export default {
  Value: {
    not: ['Verb', 'Adjective', 'Adverb'],
  },
  Ordinal: {
    parents: 'Value',
    not: ['Cardinal'],
  },
  Cardinal: {
    parents: 'Value',
    not: ['Ordinal'],
  },
  Fraction: {
    parents: 'Value',
    not: ['Noun'],
  },
  RomanNumeral: {
    parents: 'Cardinal',
    not: ['Ordinal', 'TextValue'],
  },
  TextValue: {
    parents: 'Value',
    not: ['NumericValue'],
  },
  NumericValue: {
    parents: 'Value',
    not: ['TextValue'],
  },
  Money: {
    parents: 'Cardinal',
  },
  Percent: {
    parents: 'Value',
  },
}
