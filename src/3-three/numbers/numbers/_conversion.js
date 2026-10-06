// Shift decimal places without introducing multiplication rounding artifacts.
const shiftDecimal = (num, places) => {
  const [coefficient, exponent = '0'] = String(num).split('e')
  return Number(`${coefficient}e${Number(exponent) + places}`)
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

export { shiftDecimal, decimalFraction, isPercent, replaceNumber }
