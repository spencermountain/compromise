import parse from './parse/index.js'
import { decimalFraction, decimalText, isPercent, replaceNumber } from './_conversion.js'
import { Frac, Numeric } from '../../../2-two/preTagger/tagSet/_lib.js'

const toFraction = numbers => {
  const result = numbers.map(value => {
    if (value.has('#Frac')) {
      return value
    }
    const { num } = parse(value)
    if (!Number.isFinite(num) || value.has('#Money')) {
      return value.none()
    }
    let str
    if (isPercent(value)) {
      str = `${decimalText(num)}/100`
      value = value.growRight('(percent|percentage|per cent)')
    } else {
      str = decimalFraction(num).join('/')
    }
    const phrase = replaceNumber(value, str)
    phrase.unTag('Percent').tag([Frac, Numeric])
    return phrase
  })
  return result.fractions()
}

export default toFraction
