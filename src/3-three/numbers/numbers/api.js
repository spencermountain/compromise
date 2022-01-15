import find from './find.js'
import parse from './parse/index.js'
import format from './format/index.js'
import parseText from './parse/toNumber/index.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const addMethod = function (View) {
  /**   */
  class Numbers extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Numbers'
    }
    parse(n) {
      return getNth(this, n).map(parse)
    }
    get(n) {
      return getNth(this, n)
        .map(parse)
        .map(o => o.num)
    }
    json(n) {
      let doc = getNth(this, n)
      return doc.map(p => {
        let json = p.toView().json()[0]
        let parsed = parse(p)
        json.number = {
          prefix: parsed.prefix,
          num: parsed.num,
          suffix: parsed.suffix,
          hasComma: parsed.hasComma,
        }
        return json
      }, [])
    }
    /** return only ordinal numbers */
    isOrdinal() {
      return this.if('#Ordinal')
    }
    /** return only cardinal numbers*/
    isCardina() {
      return this.if('#Cardinal')
    }

    /** convert to numeric form like '8' or '8th' */
    toNumber() {
      let m = this.if('#TextValue').freeze()
      m.forEach(val => {
        val.repair()
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let fmt = obj.isOrdinal ? 'Ordinal' : 'Cardinal'
        let str = format(obj, fmt)
        val.replaceWith(str, true)
        val.tag('NumericValue')
      })
      return this
    }
    /** add commas, or nicer formatting for numbers */
    toLocaleString() {
      let m = this.freeze()
      m.forEach((val) => {
        val.repair()
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let num = obj.num.toLocaleString()
        // support ordinal?
        val.replaceWith(num)
      })
      return this
    }
    /** convert to numeric form like 'eight' or 'eighth' */
    toText() {
      let m = this.if('#NumericValue').freeze()
      m.forEach(val => {
        val.repair()
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let fmt = obj.isOrdinal ? 'TextOrdinal' : 'TextCardinal'
        let str = format(obj, fmt)
        val.replaceWith(str, true)
        val.tag('TextValue')
      })
      return this
    }
    /** convert ordinal to cardinal form, like 'eight', or '8' */
    toCardinal() {
      let m = this.if('#Ordinal').freeze()
      m.forEach(val => {
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let fmt = obj.isText ? 'TextCardinal' : 'Cardinal'
        let str = format(obj, fmt)
        val.replaceWith(str, true)
        val.tag('Cardinal')
      })
      return this
    }
    /** convert cardinal to ordinal form, like 'eighth', or '8th' */
    toOrdinal() {
      let m = this.if('#Cardinal').freeze()
      m.forEach(val => {
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let fmt = obj.isText ? 'TextOrdinal' : 'Ordinal'
        let str = format(obj, fmt)
        val.replaceWith(str, true)
        val.tag('Ordinal')
      })
      return this
    }

    /** return only numbers that are == n */
    isEqual(n) {
      return this.filter((val) => {
        let num = parse(val).num
        return num === n
      })
    }
    /** return only numbers that are > n*/
    greaterThan(n) {
      return this.filter((val) => {
        let num = parse(val).num
        return num > n
      })
    }
    /** return only numbers that are < n*/
    lessThan(n) {
      return this.filter((val) => {
        let num = parse(val).num
        return num < n
      })
    }
    /** return only numbers > min and < max */
    between(min, max) {
      return this.filter((val) => {
        let num = parse(val).num
        return num > min && num < max
      })
    }
    /** set these number to n */
    set(n, agree) {
      if (n === undefined) {
        return this // don't bother
      }
      if (typeof n === 'string') {
        n = parse(n).num
      }
      let m = this.freeze()
      m.forEach((val) => {
        val.repair()
        let obj = parse(val)
        obj.num = n
        if (obj.num === null) {
          return
        }
        let fmt = obj.isOrdinal ? 'Ordinal' : 'Cardinal'
        if (obj.isText) {
          fmt = obj.isOrdinal ? 'TextOrdinal' : 'TextCardinal'
        }
        let str = format(obj, fmt)
        val = val.not('#Currency')
        val.replaceWith(str, true)
        // handle plural/singular unit
        // agreeUnits(agree, val, obj)
      })
      return this
    }
    add(n, agree) {
      if (!n) {
        return this // don't bother
      }
      if (typeof n === 'string') {
        n = parse(n).num
      }
      let m = this.freeze()
      m.forEach((val) => {
        val.repair()
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        obj.num += n
        let fmt = obj.isOrdinal ? 'Ordinal' : 'Cardinal'
        if (obj.isText) {
          fmt = obj.isOrdinal ? 'TextOrdinal' : 'TextCardinal'
        }
        let str = format(obj, fmt)
        val = val.not('#Currency')
        val.replaceWith(str, true)
        // handle plural/singular unit
        // agreeUnits(agree, val, obj)
      })
      return this
    }
    /** decrease each number by n*/
    subtract(n, agree) {
      return this.add(n * -1, agree)
    }
    /** increase each number by 1 */
    increment(agree) {
      this.add(1, agree)
      return this
    }
    /** decrease each number by 1 */
    decrement(agree) {
      this.add(-1, agree)
      return this
    }
    // overloaded - keep Numbers class
    update(pointer) {
      let m = new Numbers(this.document, pointer)
      m._cache = this._cache // share this full thing
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
    m = getNth(m, n)
    return new Numbers(this.document, m.pointer)
  }
  // alias
  View.prototype.values = View.prototype.numbers
}
export default addMethod
