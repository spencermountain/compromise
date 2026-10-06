import find from './find.js'
import parse from './parse.js'
import toCardinal from './convert/toCardinal.js'
import toOrdinal from './convert/toOrdinal.js'
import { isValid, replaceFraction } from './_lib.js'
import { decimalText, replaceNumber } from '../numbers/_conversion.js'

const plugin = function (View) {
  /**
   */
  class Fractions extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Fractions'
    }
    parse(n) {
      return this.getNth(n).map(parse)
    }
    get(n) {
      return this.getNth(n).map(parse)
    }
    json(n) {
      return this.getNth(n).map(p => {
        const json = p.toView().json(n)[0]
        const parsed = parse(p)
        json.fraction = parsed
        return json
      }, [])
    }
    // become 0.5
    toDecimal(n) {
      const result = this.getNth(n).map(m => {
        const obj = parse(m)
        if (!isValid(obj)) {
          return m
        }
        const decimal = obj.numerator / obj.denominator
        return replaceNumber(m, decimalText(decimal)).tag('NumericValue').unTag('Fraction')
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
      return this.getNth(n).map(m => {
        const obj = parse(m)
        let str = toOrdinal(obj)
        if (!str) {
          return m
        }
        if (m.after('^#Noun').found) {
          str += ' of' // three fifths of dentists
        }
        return replaceFraction(m, str)
      })
    }
    toCardinal(n) {
      return this.getNth(n).map(m => {
        const obj = parse(m)
        const str = toCardinal(obj)
        if (!str) {
          return m
        }
        return replaceFraction(m, str)
      })
    }
    // spell it out - '1/2' -> 'one half'
    toText(n) {
      return this.getNth(n).map(m => {
        const obj = parse(m)
        const str = toOrdinal(obj)
        if (str) {
          return replaceFraction(m, str)
        }
        return m
      })
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
    update(pointer) {
      const m = new Fractions(this.document, pointer)
      m._cache = this._cache
      return m
    }
  }

  View.prototype.fractions = function (n) {
    let m = find(this)
    m = m.getNth(n)
    return new Fractions(this.document, m.pointer)
  }
}

export default plugin
