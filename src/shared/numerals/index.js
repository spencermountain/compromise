import { defaults } from './_lib.js'
import read from './read.js'
import write from './write.js'
import regexes from './regexes.js'

/**
 * a reader and writer of numbers written in digits, for one language.
 *   const { read, write } = numerals({ decimal: ',', group: '.' })
 *   read('1.234,56 €').num // 1234.56
 *   write(1234.56, { hasComma: true }) // '1.234,56'
 * `ordinal` is a regex for the ending of a numeric ordinal - /^[ºª°]$/
 */
const numerals = function (opts = {}) {
  const locale = { ...defaults, ...opts }
  return {
    locale,
    read: (str, pre = '') => read(str, pre, locale),
    write: (num, how = {}) => write(num, how, locale),
    regexes: regexes(locale),
  }
}
export default numerals
