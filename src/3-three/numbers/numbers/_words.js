// every english number-word, spelled out once
const ones = 'zero one two three four five six seven eight nine'.split(' ')
const teens = 'ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ')
const tens = 'twenty thirty forty fifty sixty seventy eighty ninety'.split(' ')
// 10^(3n), except 'hundred'
const bigs = 'hundred thousand million billion trillion quadrillion quintillion sextillion septillion'.split(' ')

const irregulars = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' }
// 'four' -> 'fourth', 'twenty' -> 'twentieth'
const ordinal = w => irregulars[w] || w.replace(/y$/, 'ie') + 'th'

// '1st', '22nd', '13th'
const ordSuffix = digits => {
  if (/1[123]$/.test(digits)) {
    return 'th'
  }
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' }
  return suffix[digits.slice(-1)] || 'th'
}

// 1e23, without floating-point drift
const pow10 = n => Number('1e' + n)

export { ones, teens, tens, bigs, ordinal, ordSuffix, pow10 }
