import { groupMark, addGroups, tidy, defaults } from './_lib.js'

/**
 * write a number in digits - 1234.5 → '1.234,5'
 * `how` is the result of read(), so a number goes back the way it was found.
 * thousands are only grouped when `how.hasComma` is set
 */
const write = function (num, how = {}, locale = defaults) {
  if (typeof num !== 'number' || !isFinite(num)) {
    return ''
  }
  num = tidy(num)
  let str = String(Math.abs(num))
  // leave '1e+21' alone
  if (/^[0-9]+(?:\.[0-9]+)?$/.test(str)) {
    let decimal = how.decimal || locale.decimal
    // '7,938' was grouped with a comma, so its decimal is a period
    if (!how.decimal && how.group === decimal) {
      decimal = groupMark(decimal, decimal)
    }
    const parts = str.split('.')
    let int = parts[0]
    const fraction = parts[1]
    if (how.hasComma) {
      int = addGroups(int, groupMark(how.group || locale.group, decimal))
    }
    str = fraction ? int + decimal + fraction : int
  }
  // the sign goes ahead of any currency - '-$5'
  const sign = num < 0 ? '-' : ''
  return sign + (how.prefix || '') + str + (how.suffix || '')
}
export default write
