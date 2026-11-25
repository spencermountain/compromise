import { groupMark, tidy } from './_lib.js'

/**
 * write a number in digits - 1234.5 → '1.234,5'
 * `how` is the result of read(), so a number goes back the way it was found.
 * thousands are only grouped when `how.hasComma` is set
 */
const write = function (num, how, locale) {
  if (typeof num !== 'number' || !isFinite(num)) {
    return ''
  }
  num = tidy(num)
  let str = String(Math.abs(num))
  // leave '1e+21' alone
  if (/^[0-9]+(?:\.[0-9]+)?$/.test(str)) {
    const decimal = how.decimal || locale.decimal
    let [int, fraction] = str.split('.')
    if (how.hasComma) {
      const group = groupMark(how.group || locale.group, decimal)
      int = int.replace(/\B(?=(?:[0-9]{3})+$)/g, group)
    }
    str = fraction ? int + decimal + fraction : int
  }
  // the sign goes ahead of any currency - '-$5'
  const sign = num < 0 ? '-' : ''
  return sign + (how.prefix || '') + str + (how.suffix || '')
}
export default write
