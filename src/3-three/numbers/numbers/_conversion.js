// Shift decimal places without introducing multiplication rounding artifacts.
const shiftDecimal = (num, places) => {
  const [coefficient, exponent = '0'] = String(num).split('e')
  return Number(`${coefficient}e${Number(exponent) + places}`)
}

// Keep generated values readable by the number parser.
const decimalText = num => {
  const str = String(num)
  if (!str.includes('e')) {
    return str
  }
  const [coefficient, exponent] = str.split('e')
  const sign = num < 0 ? '-' : ''
  const unsigned = coefficient.replace('-', '')
  const digits = unsigned.replace('.', '')
  const point = unsigned.split('.')[0].length + Number(exponent)
  if (point <= 0) {
    return `${sign}0.${'0'.repeat(-point)}${digits}`
  }
  if (point >= digits.length) {
    return sign + digits + '0'.repeat(point - digits.length)
  }
  return `${sign}${digits.slice(0, point)}.${digits.slice(point)}`
}

const decimalFraction = num => {
  const [coefficient, exponent = '0'] = String(num).split('e')
  const places = (coefficient.split('.')[1] || '').length - Number(exponent)
  let numerator = BigInt(coefficient.replace('.', ''))
  let denominator = 1n
  if (places > 0) {
    denominator = 10n ** BigInt(places)
  } else {
    numerator *= 10n ** BigInt(-places)
  }
  let divisor = numerator < 0n ? -numerator : numerator
  for (let remainder = denominator; remainder !== 0n;) {
    const next = divisor % remainder
    divisor = remainder
    remainder = next
  }
  return `${numerator / divisor}/${denominator / divisor}`
}

const isPercent = value => value.has('#Percent') || value.after('^per cent').found

const replaceNumber = (value, str) => {
  // A leading decimal point is stored as pre-punctuation.
  const first = value.docs[0][0]
  if (/\.$/.test(first.pre) && /^\d/.test(first.text)) {
    first.pre = first.pre.slice(0, -1)
  }
  return value.replaceWith(str).firstTerm()
}

export { shiftDecimal, decimalText, decimalFraction, isPercent, replaceNumber }
