import {
  V, JJ, RB, Value, Cardinal, Ordinal, NN, TextValue, NumericValue, RomanNumeral,
} from './_lib.js'

// Written format is independent of quantity types such as Fraction or Money.
export default {
  Value: {
    not: [V, JJ, RB],
    alias: 'Val'
  },
  Ordinal: {
    aliases: ['Ord'],
    is: Value,
    not: [Cardinal],
  },
  Cardinal: {
    aliases: ['Card'],
    is: Value,
    not: [Ordinal],
  },
  Fraction: {
    aliases: ['Frac'],
    is: Value,
    not: [NN],
  },
  Multiple: {
    is: TextValue,
  },
  RomanNumeral: {
    is: Cardinal,
  },
  TextValue: {
    aliases: ['TxtNum'],
    is: Value,
    not: [NumericValue, RomanNumeral],
  },
  NumericValue: {
    aliases: ['Num'],
    is: Value,
    not: [RomanNumeral],
    alias: 'Numeric'
  },
  Money: {
    is: Cardinal,
  },
  Percent: {
    is: Value,
  },
}
