import find from './find.js'
import parse from './parse/index.js'
import format from './format/index.js'
import isUnit from './isUnit.js'
import convert from './_lib.js'
import toFraction from './toFraction.js'
import toPercentage from './toPercentage.js'
import toDecimal from './toDecimal.js'

const addMethod = function (View) {
  /**   */
  class Numbers extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Numbers'
    }
    parse(n) {
      return this.getNth(n).map(parse)
    }
    get(n) {
      return this.getNth(n)
        .map(parse)
        .map(o => o.num)
    }
    json(n) {
      const opts = typeof n === 'object' ? n : {}
      return this.getNth(n).map(p => {
        const json = p.toView().json(opts)[0]
        const parsed = parse(p)
        json.number = {
          prefix: parsed.prefix,
          num: parsed.num,
          suffix: parsed.suffix,
          hasComma: parsed.hasComma,
          unit: parsed.unit,
        }
        return json
      }, [])
    }
    /** any known measurement unit, for the number */
    units() {
      return this.growRight('#Unit').match('#Unit$')
    }
    /** return values that match a given unit */
    isUnit(allowed) {
      return isUnit(this, allowed)
    }
    /** return only ordinal numbers */
    isOrdinal() {
      return this.if('#Ordinal')
    }
    /** return only cardinal numbers*/
    isCardinal() {
      return this.if('#Cardinal')
    }

    /** convert to numeric form like '8' or '8th' */
    toNumber() {
      return convert(this, 'NumericValue',
        () => !this.has('#TextValue'),
        val => val.has('#Ordinal') ? 'Ordinal' : 'Cardinal')
    }
    /** add commas, or nicer formatting for numbers */
    toLocaleString() {
      const m = this
      const res = m._mapNumbers(val => {
        const obj = parse(val)
        if (obj.num === null) {
          return val
        }
        let num = obj.num.toLocaleString()
        // support ordinal ending, too
        if (val.has('#Ordinal')) {
          num += format(obj, 'Ordinal').slice(obj.prefix.length).match(/[a-z]+/)[0]
        }
        val.replaceWith(obj.prefix + num + obj.suffix, { tags: true })
        return val
      })
      return this.update(res.pointer)
    }

    /** convert to numeric form like 'eight' or 'eighth' */
    toText() {
      return convert(this, 'TextValue',
        val => val.has('#TextValue'),
        val => val.has('#Ordinal') ? 'TextOrdinal' : 'TextCardinal')
    }
    /** convert ordinal to cardinal form, like 'eight', or '8' */
    toCardinal() {
      return convert(this, 'Cardinal',
        val => !val.has('#Ordinal'),
        val => val.has('#TextValue') ? 'TextCardinal' : 'Cardinal')
    }
    /** convert cardinal to ordinal form, like 'eighth', or '8th' */
    toOrdinal() {
      return convert(this, 'Ordinal',
        val => val.has('#Ordinal'),
        val => val.has('#TextValue') ? 'TextOrdinal' : 'Ordinal')
    }
    toFraction() {
      return toFraction(this)
    }
    toPercentage() {
      return toPercentage(this)
    }
    toDecimal() {
      return toDecimal(this)
    }

    /** return only numbers that are == n */
    isEqual(n) {
      return this.filter(val => {
        const num = val.get(0)[0]
        return num === n
      })
    }
    /** return only numbers that are > n*/
    greaterThan(n) {
      return this.filter(val => {
        const num = val.get(0)[0]
        return num > n
      })
    }
    /** return only numbers that are < n*/
    lessThan(n) {
      return this.filter(val => {
        const num = val.get(0)[0]
        return num < n
      })
    }
    /** return only numbers > min and < max */
    between(min, max) {
      return this.filter(val => {
        const num = val.get(0)[0]
        return num > min && num < max
      })
    }
    /** set these number to n */
    set(n) {
      if (n === undefined) {
        return this // don't bother
      }
      if (typeof n === 'string') {
        n = parse(n).num
      }
      const m = this
      const res = m._mapNumbers(val => {
        const obj = parse(val)
        obj.num = n
        if (obj.num === null) {
          return val
        }
        let fmt = val.has('#Ordinal') ? 'Ordinal' : 'Cardinal'
        if (val.has('#TextValue')) {
          fmt = val.has('#Ordinal') ? 'TextOrdinal' : 'TextCardinal'
        }
        const str = format(obj, fmt)
        val = val.not('#Currency')
        val.replaceWith(str, { tags: true })
        // handle plural/singular unit
        // agreeUnits(agree, val, obj)
        return val
      }, () => n)
      return this.update(res.pointer)
    }
    add(n) {
      if (!n) {
        return this // don't bother
      }
      if (typeof n === 'string') {
        n = parse(n).num
      }
      const m = this
      const res = m._mapNumbers(val => {
        const obj = parse(val)
        if (obj.num === null) {
          return val
        }
        obj.num = this._add(obj.num, n)
        let fmt = val.has('#Ordinal') ? 'Ordinal' : 'Cardinal'
        if (obj.isText) {
          fmt = val.has('#Ordinal') ? 'TextOrdinal' : 'TextCardinal'
        }
        const str = format(obj, fmt)
        val.replaceWith(str, { tags: true })
        // handle plural/singular unit
        // agreeUnits(agree, val, obj)
        return val
      }, num => this._add(num, n))
      return this.update(res.pointer)
    }
    /** decrease each number by n*/
    subtract(n, agree) {
      return this.add(n * -1, agree)
    }
    /** increase each number by 1 */
    increment(agree) {
      return this.add(1, agree)
    }
    /** decrease each number by 1 */
    decrement(agree) {
      return this.add(-1, agree)
    }
    // Subclasses may supply decimal arithmetic.
    _add(a, b) {
      return a + b
    }
    // Let subclasses select the numeric portion of each phrase.
    _mapNumbers(fn) {
      return this.map(fn)
    }
    // overloaded - keep the current class
    update(pointer) {
      const m = new this.constructor(this.document, pointer)
      m._cache = this._cache // share this full thing
      m.world = this.world
      return m
    }
  }
  // aliases
  Numbers.prototype.toNice = Numbers.prototype.toLocaleString
  Numbers.prototype.isBetween = Numbers.prototype.between
  Numbers.prototype.minus = Numbers.prototype.subtract
  Numbers.prototype.plus = Numbers.prototype.add
  Numbers.prototype.equals = Numbers.prototype.isEqual

  View.prototype.numbers = function (n) {
    let m = find(this)
    m = m.getNth(n)
    return new Numbers(this.document, m.pointer)
  }
  View.prototype.percentages = function (n) {
    let m = find(this)
    m = m.filter(v => v.has('#Percent') || v.after('^per cent').found)
    m = m.getNth(n)
    return new Numbers(this.document, m.pointer)
  }
  // alias
  View.prototype.values = View.prototype.numbers
  return Numbers
}
export default addMethod
