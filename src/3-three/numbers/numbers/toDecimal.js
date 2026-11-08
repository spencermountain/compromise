import parse from './parse/index.js'
import { shiftDecimal, decimalText, isPercent, replaceNumber } from './_conversion.js'
import { Card, Numeric } from '../../../2-two/preTagger/tagSet/_lib.js'

const toDecimal = numbers => {
  const result = numbers.map(value => {
    if (!isPercent(value)) {
      return value
    }
    const num = shiftDecimal(parse(value).num, -2)
    if (!Number.isFinite(num)) {
      return value.none()
    }
    const phrase = value.growRight('(percent|percentage|per cent)')
    return replaceNumber(phrase, decimalText(num)).unTag('Percent').tag([Card, Numeric])
  })
  return result.numbers()
}

export default toDecimal
