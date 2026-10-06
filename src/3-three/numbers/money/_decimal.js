import { decimalText } from '../numbers/_conversion.js'

const places = value => (String(value).split('.')[1] || '').length

// Add decimal inputs as scaled integers, avoiding binary floating-point tails.
const add = (a, b) => {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return a + b
  }
  const strings = [decimalText(a), decimalText(b)]
  const precision = Math.max(...strings.map(places))
  const integers = strings.map(str => {
    const [whole, fraction = ''] = str.split('.')
    return BigInt(whole + fraction.padEnd(precision, '0'))
  })
  return Number(`${integers[0] + integers[1]}e-${precision}`)
}

const fixed = (num, precision) => {
  const [whole, fraction = ''] = decimalText(Math.abs(num)).split('.')
  const digits = fraction.padEnd(precision, '0')
  if (digits) {
    return whole + '.' + digits
  }
  return whole
}

export { add, fixed, places }
