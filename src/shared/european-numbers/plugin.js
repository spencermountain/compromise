import { defaults } from './_lib.js'
import read from './read.js'
import write from './write.js'
import regexes from './regexes.js'
import europeanNumbers from './compute.js'

/**
 * numbers written in digits, with a decimal-comma - '1.234,56', '3,5%', '5,30 €'
 * tags them, and adds a reader and writer:
 *   const { read, write } = doc.methods.two.europeanNumbers
 *   const locale = doc.model.two.europeanNumbers
 *   read('1.234,56', term.pre, locale).num // 1234.56
 *   write(1234.56, { hasComma: true }, locale) // '1.234,56'
 * a language sets its own marks in model.two.europeanNumbers - { group: ' ', ordinal: 'er?' }
 */
export default {
  model: { two: { europeanNumbers: { ...defaults } } },
  methods: { two: { europeanNumbers: { read, write, regexes } } },
  compute: { europeanNumbers },
  hooks: ['europeanNumbers'],
}
