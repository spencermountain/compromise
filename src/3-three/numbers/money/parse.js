import { parts, numberOf } from './find.js'
import { currency, isMinor, multiplier } from './_currency.js'
import { add, scale } from './_decimal.js'
import parseNumber from '../numbers/parse/index.js'

const isNegative = value => /^(?:minus\b|[+\p{Currency_Symbol}\s]*-)/u.test(value.text('reduced'))

const parse = value => {
  const amounts = parts(value)
  const first = amounts.eq(0)
  let num = parseNumber(numberOf(first)).num
  const negative = isNegative(first)
  num = scale(Math.abs(num), multiplier(first))
  if (amounts.length === 2 && isMinor(first, amounts.eq(1))) {
    num = add(num, scale(parseNumber(numberOf(amounts.eq(1))).num, multiplier(amounts.eq(1))))
  }
  if (negative && num !== 0) {
    num *= -1
  }
  return { currency: currency(value), num }
}

export default parse
