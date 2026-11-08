import parseText from './toNumber/index.js'
import parseFraction from '../../fractions/parse.js'
import spokenYear from '../../../../2-two/preTagger/methods/spokenYear.js'

// 'twenty twenty-six'
const parseYear = str => spokenYear(str.split(/[ -]/))

// '-$4.00kg' -> ['-$', '4.00', 'kg']
const numericForm = /^([^0-9.]*)(\.?[0-9][0-9,.]*)([^0-9,.].*)?$/

const parseNumeric = function (str, m) {
  str = str.replace(/,/g, '')
  const found = str.match(numericForm)
  if (found === null || m.length >= 2) {
    return null
  }
  let [, prefix, num, suffix = ''] = found
  num = Number(num)
  if (Number.isNaN(num)) {
    num = null
  } else if (/[-−]/.test(prefix)) {
    // a leading minus is part of the value - '-5', '-$5', '(-5)'
    num = -num || 0
  }
  prefix = prefix.replace(/[-−]/, '')
  // strip an ordinal off the suffix
  if (suffix === 'st' || suffix === 'nd' || suffix === 'rd' || suffix === 'th') {
    suffix = ''
  }
  // strip a possessive, too - it gets kept when replaced
  if (suffix === "'s" && m.has('#Poss')) {
    suffix = ''
  }
  // support M for million, k for thousand
  // if (suffix === 'm' || suffix === 'M') {
  //   num *= 1000000
  //   suffix = ''
  // }
  // if (suffix === 'k' || suffix === 'k') {
  //   num *= 1000
  //   suffix = ''
  // }
  return {
    prefix,
    num,
    suffix,
  }
}

// get a numeric value from this phrase
const parseNumber = function (m) {
  if (typeof m === 'string') {
    return { num: parseYear(m) ?? parseText(m) }
  }
  let str = m.text('reduced')
  if (m.text().includes('¢')) {
    str = str.replace(/^c|c$/g, '¢')
  }
  // reach for '12 litres'
  const unit = m.growRight('#Unit').match('#Unit$').text('machine')
  // is it in '3,123' format?
  const hasComma = /[0-9],[0-9]/.test(m.text('text'))
  // parse a numeric-number like '$4.00'
  if (m.terms().length === 1 && !m.has('#Mult')) {
    // '1/2' is its quotient, not its numerator
    if (m.has('#Frac') && str.includes('/')) {
      const frac = parseFraction(m)
      let num = null
      if (frac && frac.decimal !== undefined) {
        num = frac.decimal
      }
      return { prefix: '', num, suffix: '', hasComma, unit }
    }
    const res = parseNumeric(str, m)
    if (res !== null) {
      res.hasComma = hasComma
      res.unit = unit
      return res
    }
  }
  // 'two and a half thousand' is (2 + 0.5) * 1000
  if (m.has('(#Frac && !(a|of|and)) (#Mult && !#Frac && !#Ord)+$')) {
    const mult = m.match('(#Mult && !#Frac && !#Ord)+$')
    const lead = parseNumber(m.not(mult))
    const scale = parseText(mult.text('reduced'))
    if (lead.num !== null && scale) {
      return { ...lead, num: lead.num * scale, unit }
    }
  }
  // -- parse text-formats --
  // Fractions: remove 'and a half' etc. from the end
  let frPart = m.match('#Frac{2,}$')
  frPart = frPart.found ? frPart : m.match('^#Frac$')
  let fraction = null
  if (frPart.found) {
    if (frPart.has('#Val and #Val #Frac')) {
      frPart = frPart.match('and #Val #Frac')
    }
    fraction = parseFraction(frPart)
    // remove it from our string
    m = m.not(frPart)
    m = m.not('and$')
    str = m.text('reduced')
  }
  let num = null
  if (str) {
    let end = str.length
    for (; end > 0 && /[.!?]/.test(str[end - 1]); end -= 1) {
      // Sentence punctuation is not part of the number.
    }
    const text = str.slice(0, end)
    // the tagger already decided if this is a year
    const year = m.has('#Year') ? parseYear(text) : null
    num = year ?? parseText(text)
    // 'negative zero'
    if (num === 0) {
      num = 0
    }
  }
  // apply numeric fraction
  if (fraction && fraction.decimal) {
    num = (num || 0) + fraction.decimal
  }


  return {
    hasComma,
    prefix: '',
    num,
    suffix: '',
    isOrdinal: m.has('#Ord'),
    isText: m.has('#TxtNum'),
    isFraction: m.has('#Frac'),
    isMoney: m.has('#Money'),
    unit
  }
}
export default parseNumber
