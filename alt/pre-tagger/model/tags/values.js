export const Value = {
  not: ['Verb', 'Adjective', 'Adverb'],
}
export const Ordinal = {
  parents: 'Value',
  not: ['Cardinal'],
}
export const Cardinal = {
  parents: 'Value',
  not: ['Ordinal'],
}
export const Fraction = {
  parents: 'Value',
  not: ['Noun'],
}
export const RomanNumeral = {
  parents: 'Cardinal',
  not: ['Ordinal', 'TextValue'],
}
export const TextValue = {
  parents: 'Value',
  not: ['NumericValue'],
}
export const NumericValue = {
  parents: 'Value',
  not: ['TextValue'],
}
export const Money = {
  parents: 'Cardinal',
}
export const Percent = {
  parents: 'Value',
}
export default {
  Value,
  Ordinal,
  Cardinal,
  Fraction,
  RomanNumeral,
  TextValue,
  NumericValue,
  Money,
  Percent,
}
