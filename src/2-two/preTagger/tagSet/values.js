import { Vb, Adj, Adv, Val, Card, Ord, NN, TxtNum, Numeric, RomanNumeral } from './_lib.js'

// Written format is independent of quantity types such as Fraction or Money.
export default {
  Value: {
    aliases: ['Val', 'Num'],
    not: [Vb, Adj, Adv],
  },
  Ordinal: {
    aliases: [null, 'Ord'],
    is: Val,
    not: [Card],
  },
  Cardinal: {
    aliases: [null, 'Card', 'CD'],
    is: Val,
    not: [Ord],
  },
  Fraction: {
    aliases: [null, 'Frac'],
    is: Val,
    not: [NN],
  },
  Multiple: {
    aliases: [null, 'Mult'],
    is: TxtNum,
  },
  RomanNumeral: {
    aliases: [null, 'RomNum'],
    is: Card,
  },
  TextValue: {
    aliases: [null, 'TxtNum'],
    is: Val,
    not: [Numeric, RomanNumeral],
  },
  NumericValue: {
    aliases: ['Numeric'],
    is: Val,
    not: [RomanNumeral],
  },
  Money: {
    is: Card,
  },
  Percent: {
    aliases: [null, 'Perc', 'Pct'],
    is: Val,
  },
}
