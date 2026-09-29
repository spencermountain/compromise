// Written format is independent of quantity types such as Fraction or Money.
export default {
  Value: {
    not: ['Verb', 'Adjective', 'Adverb'],
    alias: 'Val'
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
  Multiple: {
    is: 'TextValue',
  },
  RomanNumeral: {
    is: 'Cardinal',
  },
  TextValue: {
    is: 'Value',
    not: ['NumericValue', 'RomanNumeral'],
  },
  NumericValue: {
    is: 'Value',
    not: ['RomanNumeral'],
    alias: 'Numeric'
  },
  Money: {
    is: 'Cardinal',
  },
  Percent: {
    is: 'Value',
  },
}
