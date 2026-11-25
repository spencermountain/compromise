import { minus, signs, currency, defaults, isOrdinal } from './_lib.js'

// digits, and any mark that sits between two of them - '1.234,56', '1 000', "1'000"
const body = /^[0-9](?:[0-9]|[.,'’\s](?=[0-9]))*/
const count = (str, char) => str.split(char).length - 1

// which mark is the decimal, and which one groups the thousands?
// two different marks, or a repeated one, say so themselves - '1.234,56', '1.234.567'
// a lone '.' or ',' is the only real guess, and the locale makes it
const findMarks = function (str, locale) {
  const dots = count(str, '.')
  const commas = count(str, ',')
  // a space or an apostrophe is only ever a thousands-group
  const soft = str.match(/[ ']/)
  let decimal = null
  let group = soft ? soft[0] : null
  if (dots && commas) {
    // the last one is the decimal
    decimal = str.lastIndexOf(',') > str.lastIndexOf('.') ? ',' : '.'
    group = decimal === ',' ? '.' : ','
    if (soft) {
      return null
    }
  } else if (dots + commas > 1) {
    group = dots ? '.' : ','
    if (soft) {
      return null
    }
  } else if (dots + commas === 1) {
    const mark = dots ? '.' : ','
    const isGroup = /^[1-9][0-9]{0,2}[.,][0-9]{3}$/.test(str)
    const isDecimal = mark === locale.decimal && !(locale.loose && isGroup)
    if (soft || isDecimal || !isGroup) {
      decimal = mark // '3,5', and '3.5' anywhere
    } else {
      group = mark // '1.000' where the decimal is a comma
    }
  }
  return { decimal, group }
}

// '1.234,56' → 1234.56, or null for something that isn't one number - '1.2.3'
const toNumber = function (str, marks) {
  let int = str
  let fraction = ''
  if (marks.decimal) {
    const parts = str.split(marks.decimal)
    if (parts.length !== 2) {
      return null
    }
    int = parts[0]
    fraction = parts[1]
  }
  // thousands come in threes
  if (marks.group) {
    const groups = int.split(marks.group)
    if (groups[0].length > 3 || groups.slice(1).some(s => s.length !== 3)) {
      return null
    }
    int = groups.join('')
  }
  if (!/^[0-9]+$/.test(int) || !/^[0-9]*$/.test(fraction)) {
    return null
  }
  return Number(fraction ? int + '.' + fraction : int)
}

/**
 * pull-apart a number written in digits - '-5', '1.234,56 €', '3,5%', '2ª'
 * `pre` is any punctuation that the tokenizer left in front of it - '(-'
 * `locale` is model.two.europeanNumbers
 */
const read = function (str, pre = '', locale = defaults) {
  const res = {
    num: null,
    prefix: '',
    suffix: '',
    hasComma: false,
    decimal: null,
    group: null,
    ordinal: null,
    currency: null,
    isPercent: false,
    isFraction: false,
  }
  str = String(str).trim()
  const begin = str.search(/[0-9]/)
  if (begin === -1) {
    return res
  }
  let prefix = str.slice(0, begin)
  const raw = str.slice(begin).match(body)[0]
  let suffix = str.slice(begin + raw.length)
  // every kind of space, and both kinds of apostrophe
  let digits = raw.replace(/\s/g, ' ').replace(/’/g, "'")
  // a decimal with nothing in front of it - '.5', ',5'
  const lead = prefix.slice(-1)
  if ((lead === '.' || lead === ',') && /^[0-9]+$/.test(digits)) {
    digits = '0' + lead + digits
    prefix = prefix.slice(0, -1)
  }
  const marks = findMarks(digits, locale)
  let num = marks ? toNumber(digits, marks) : null
  if (num === null) {
    return res
  }
  // a fraction - '1/2'
  const frac = suffix.match(/^\/([0-9]+)$/)
  if (frac && Number(frac[1]) !== 0) {
    num /= Number(frac[1])
    suffix = ''
    res.isFraction = true
  }
  // the sign may be hiding in the punctuation - '(-5)'
  // .. on either side of the currency - '-$5', '$-5' - but not 'covid-19'
  if (minus.test(prefix) || /[-−]$/.test(pre)) {
    num *= -1
  }
  // a numeric ordinal - '2ª', '5-го', '3e'
  if (isOrdinal(suffix, locale.ordinal)) {
    res.ordinal = suffix
    suffix = ''
  }
  res.num = num
  res.prefix = prefix.replace(signs, '')
  res.suffix = suffix
  res.decimal = marks.decimal
  res.group = marks.group
  res.hasComma = marks.group !== null
  // remember which space it was - a non-breaking one is put back as one
  if (marks.group === ' ') {
    res.group = raw.match(/\s/)[0]
  }
  const money = [res.prefix, suffix].find(s => currency.test(s))
  res.currency = money ? money.trim() : null
  res.isPercent = /^\s*[%％]/.test(suffix)
  return res
}
export default read
