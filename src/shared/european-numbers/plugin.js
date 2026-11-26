import { defaults } from './_lib.js'
import read from './read.js'
import write from './write.js'
import regexes from './regexes.js'
import europeanNumbers from './compute.js'

/**
 * numbers written in digits, with a decimal-comma - '1.234,56', '3,5%', '5,30 €'
 * shared across many languages
 * tags them, and adds a reader and writer:
 *   const { read, write } = doc.methods.two.europeanNumbers
 *   const locale = doc.model.two.europeanNumbers
 *   read('1.234,56', term.pre, locale).num // 1234.56
 *   write(1234.56, { hasComma: true }, locale) // '1.234,56'
 * a language sets its own marks in model.two.europeanNumbers - { group: ' ', ordinal: 'er?' }
 * and its own words - { percent: ['per cento'], currencies: ['euro'] } - for '50 per cento', 'mille euro'
 */
export default {
  model: { two: { europeanNumbers: { ...defaults, percent: [], currencies: [] } } },
  methods: { two: { europeanNumbers: { read, write, regexes } } },
  compute: { europeanNumbers },
  hooks: ['europeanNumbers'],
}
