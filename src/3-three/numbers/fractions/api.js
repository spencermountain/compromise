import select from '../../_select.js'
import keepClass, { jsonWith } from '../../_lib.js'
import find from './find.js'
import parse from './parse.js'
import toCardinal from './convert/toCardinal.js'
import toOrdinal from './convert/toOrdinal.js'
import { isValid, replaceFraction } from './_lib.js'
import { decimalText, replaceNumber } from '../numbers/_conversion.js'
import { Numeric, Frac } from '../../../2-two/preTagger/tagSet/_lib.js'

// replace each fraction with a spelled-out form
const convert = (view, n, fn) => view.getNth(n).map(m => {
  const str = fn(parse(m), m)
  return str ? replaceFraction(m, str) : m
})

const plugin = function (View) {
  /**
   */
  class Fractions extends View {
    parse(n) {
      return this.getNth(n).map(parse, [])
    }
    json(n) {
      return jsonWith(this, n, 'fraction', parse)
    }
    // become 0.5
    toDecimal(n) {
      const result = this.getNth(n).map(m => {
        const obj = parse(m)
        if (!isValid(obj)) {
          return m
        }
        const decimal = obj.numerator / obj.denominator
        return replaceNumber(m, decimalText(decimal)).tag(Numeric).unTag(Frac)
      })
      return result.numbers()
    }
    toFraction(n) {
      const result = this.getNth(n).map(m => {
        const obj = parse(m)
        if (isValid(obj)) {
          const str = `${decimalText(obj.numerator)}/${decimalText(obj.denominator)}`
          return replaceFraction(m, str)
        }
        return m
      })
      return result.fractions()
    }
    toOrdinal(n) {
      return convert(this, n, (obj, m) => {
        let str = toOrdinal(obj)
        if (str && m.after('^#NN').found) {
          str += ' of' // three fifths of dentists
        }
        return str
      })
    }
    toCardinal(n) {
      return convert(this, n, toCardinal)
    }
    // spell it out - '1/2' -> 'one half'
    toText(n) {
      return convert(this, n, toOrdinal)
    }
    toPercentage(n) {
      return this.getNth(n).map(m => {
        const obj = parse(m)
        if (!isValid(obj)) {
          return m
        }
        const { numerator, denominator } = obj
        let percent = numerator
        // Hundredths already contain the exact percentage.
        if (denominator !== 100) {
          percent = numerator / denominator * 100
          percent = Math.round(percent * 100) / 100
        }
        return replaceNumber(m, `${decimalText(percent)}%`)
      })
    }
  }
  keepClass(Fractions, 'Fractions')
  Fractions.prototype.get = Fractions.prototype.parse

  View.prototype.fractions = select(Fractions, find, true)
}

export default plugin
