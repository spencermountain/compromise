import parse from './parse/index.js'
import { shiftDecimal, replaceNumber } from './_conversion.js'

const toDecimal = percentages => {
  const result = percentages.map(value => {
    const num = shiftDecimal(parse(value).num, -2)
    if (!Number.isFinite(num)) {
      return value.none()
    }
    const phrase = value.growRight('(percent|percentage|per cent)')
    return replaceNumber(phrase, String(num)).unTag('Percent').tag(['Cardinal', 'NumericValue'])
  })
  return result.numbers()
}

export default toDecimal
