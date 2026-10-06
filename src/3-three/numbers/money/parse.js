import { parts, numberOf } from './find.js'
import { currency, isMinor } from './_currency.js'
import { add } from './_decimal.js'
import { shiftDecimal } from '../numbers/_conversion.js'
import parseNumber from '../numbers/parse/index.js'

const isNegative = value => /^(?:minus\b|[+\p{Currency_Symbol}\s]*-)/u.test(value.text('reduced'))

const parse = value => {
  const amounts = parts(value)
  const first = amounts.eq(0)
  let num = parseNumber(numberOf(first)).num
  const negative = isNegative(first)
  num = Math.abs(num)
  if (amounts.length === 2 && isMinor(first, amounts.eq(1))) {
    num = add(num, shiftDecimal(parseNumber(numberOf(amounts.eq(1))).num, -2))
  }
  if (negative && num !== 0) {
    num *= -1
  }
  return { currency: currency(first), num }
}

export default parse
