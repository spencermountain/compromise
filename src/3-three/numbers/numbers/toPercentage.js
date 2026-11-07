import parse from './parse/index.js'
import { shiftDecimal, decimalText, isPercent, replaceNumber } from './_conversion.js'
import { Numeric } from '../../../2-two/preTagger/tagSet/_lib.js'

const toPercentage = numbers => {
  const result = numbers.map(value => {
    if (isPercent(value)) {
      return value
    }
    const num = shiftDecimal(parse(value).num, 2)
    if (!Number.isFinite(num) || value.has('#Money')) {
      return value.none()
    }
    return replaceNumber(value, `${decimalText(num)}%`).tag(['Percent', Numeric])
  })
  return result.percentages()
}

export default toPercentage
