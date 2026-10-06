import { parts } from './find.js'
import { currency, isMinor } from './_currency.js'

const parse = value => {
  const amounts = parts(value)
  const first = amounts.eq(0)
  let num = first.numbers().get()[0]
  if (amounts.length === 2 && isMinor(first, amounts.eq(1))) {
    num += amounts.eq(1).numbers().get()[0] / 100
  }
  return { currency: currency(first), num }
}

export default parse
