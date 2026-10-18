import parse from './parse/index.js'
import { shiftDecimal, decimalText, isPercent, replaceNumber } from './_conversion.js'

const toPercentage = numbers => {
  const result = numbers.map(value => {
    if (isPercent(value)) {
      return value
    }
    const num = shiftDecimal(parse(value).num, 2)
    if (!Number.isFinite(num) || value.has('#Money')) {
      return value.none()
    }
    return replaceNumber(value, `${decimalText(num)}%`).tag(['Percent', 'NumericValue'])
  })
  return result.percentages()
}

export default toPercentage
