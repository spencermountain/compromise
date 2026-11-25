const sign = '[-+−]?'
// '1.234.567,89', or '1234,5' - either mark, the reader sorts-out which is which
const digits = "(?:[0-9]{1,3}(?:[.,'’][0-9]{3})+(?:[.,][0-9]+)?|[0-9]+(?:[.,][0-9]+)?)"
// 'R$', 'US$', '€'
const symbol = '(?:[a-z]{1,2})?\\p{Sc}'

const cardinal = ['Cardinal', 'NumericValue']
const percent = ['Percent', 'Cardinal', 'NumericValue']
const money = ['Money', 'Value']

/**
 * preTagger rules for numbers written in digits, as [regex, tags, example].
 * test them on the term's text, not its 'normal' - which has lost its commas
 */
const regexes = function (locale) {
  const reg = str => new RegExp('^' + str + '$', 'iu')
  const out = [
    [reg(sign + symbol + ' ?' + sign + digits + '(?:[kmb]|bn)?\\+?'), money, '€5,30'],
    [reg(sign + digits + ' ?' + symbol + '\\+?'), money, '5,30€'],
    [reg(sign + digits + '\\+?'), cardinal, '1.234,56'],
    [reg(sign + '[.,][0-9]+\\+?'), cardinal, ',5'],
    [reg(sign + digits + ' ?[%％]\\+?'), percent, '3,5%'],
    [reg(sign + '[.,][0-9]+[%％]'), percent, ',5%'],
  ]
  // '2ª', '5-го', '3e'
  if (locale.ordinal) {
    const src = locale.ordinal.source.replace(/^\^|\$$/g, '')
    out.push([reg('[0-9]+(?:' + src + ')'), ['Ordinal', 'NumericValue'], 'ordinal'])
  }
  return out
}
export default regexes
