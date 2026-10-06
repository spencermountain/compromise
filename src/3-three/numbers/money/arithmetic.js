import { parts, numberOf } from './find.js'
import parseMoney from './parse.js'
import parseNumber from '../numbers/parse/index.js'
import format from '../numbers/format/index.js'
import { multiplier } from './_currency.js'
import { add, fixed, places, scale } from './_decimal.js'

const replace = (part, amount, negative = amount < 0) => {
  const number = numberOf(part)
  const obj = parseNumber(number)
  const [sentence, start, end] = part.fullPointer[0]
  const before = part.document[sentence].length
  obj.num = Math.abs(amount)
  obj.prefix = obj.prefix.replace(/[-+]/g, '')
  let str
  if (number.has('#TextValue')) {
    str = format(obj, 'TextCardinal')
    if (negative) {
      str = 'minus ' + str
    }
  } else {
    let text = number.text('reduced')
    if (number.text().includes('¢')) {
      text = text.replace(/c$/, '¢')
    }
    const original = text.match(/\d[\d,]*(?:\.\d+)?/)
    const precision = original ? places(original[0]) : 0
    if (original) {
      obj.prefix = text.slice(0, original.index).replace(/[-+]/g, '')
      obj.suffix = text.slice(original.index + original[0].length)
    }
    let digits = fixed(amount, precision)
    if (obj.hasComma) {
      const [whole, fraction] = digits.split('.')
      const groups = []
      for (let offset = whole.length; offset > 0; offset -= 3) {
        groups.unshift(whole.slice(Math.max(0, offset - 3), offset))
      }
      digits = groups.join(',')
      if (fraction !== undefined) {
        digits += '.' + fraction
      }
    }
    const code = number.text().match(/(cad|usd)\b/i)?.[0]
    if (code) {
      obj.suffix = obj.suffix.replace(/cad|usd/i, code)
    }
    str = obj.prefix + digits + obj.suffix
    if (negative) {
      str = '-' + str
    }
  }
  // A leading sign may live in punctuation rather than the term text.
  const first = number.docs[0][0]
  first.pre = first.pre.replace(/[-+]$/, '')
  number.replaceWith(str, { tags: true })
  const delta = part.document[sentence].length - before
  const updated = part.update([[sentence, start, end + delta]])
  const unit = updated.match('(dollar|dollars|euro|euros|pound|pounds|cent|cents|penny|pennies|pence)').nouns()
  if (unit.has('pence')) {
    if (Math.abs(amount) === 1) {
      unit.replaceWith('penny')
    }
  } else if (Math.abs(amount) === 1) {
    unit.toSingular()
  } else {
    unit.toPlural()
  }
}

const arithmetic = (value, operation) => {
  const amounts = parts(value)
  const num = operation(parseMoney(value).num)
  if (!Number.isFinite(num)) {
    return
  }
  if (amounts.length === 1) {
    replace(amounts.eq(0), scale(num, multiplier(amounts.eq(0)), true))
  } else if (amounts.length === 2) {
    const major = Math.trunc(Math.abs(num))
    const minor = scale(add(Math.abs(num), -major), multiplier(amounts.eq(1)), true)
    // Work backwards so resizing the major part cannot move the minor selection.
    replace(amounts.eq(1), minor)
    replace(amounts.eq(0), major, num < 0)
  }
}

export default arithmetic
