import parse from './parse/index.js'
import { decimalFraction, isPercent, replaceNumber } from './_conversion.js'

const toFraction = numbers => {
  const result = numbers.map(value => {
    if (value.has('#Fraction')) {
      return value
    }
    const { num } = parse(value)
    if (!Number.isFinite(num) || value.has('#Money')) {
      return value.none()
    }
    let str = decimalFraction(num)
    if (isPercent(value)) {
      str = `${num}/100`
      value = value.growRight('(percent|percentage|per cent)')
    }
    const phrase = replaceNumber(value, str)
    phrase.unTag('Percent').tag(['Fraction', 'NumericValue'])
    return phrase
  })
  return result.fractions()
}

export default toFraction
