import select from '../../_select.js'
import keepClass, { jsonWith } from '../../_lib.js'
import { Numeric, Ord, Card, TxtNum } from '../../../2-two/preTagger/tagSet/_lib.js'
import find from './find.js'
import parse from './parse/index.js'
import format from './format/index.js'
import isUnit from './isUnit.js'
import isValid from './isValid.js'
import convert from './_lib.js'
import { isPercent, dropPreSign } from './_conversion.js'
import toFraction from './toFraction.js'
import toPercentage from './toPercentage.js'
import toDecimal from './toDecimal.js'

const ordinalMatch = '#Ord'
const textValueMatch = '#TxtNum'
const textOrdinal = 'TextOrdinal'
const textCardinal = 'TextCardinal'
const keep = { tags: true, possessives: true }

// shared by set() and add(): give each number a new value, in its current format
// eslint-disable-next-line max-params
const edit = (view, n, apply, operation, isText, strip) => {
  if (typeof n === 'string') {
    n = parse(n).num
  }
  const res = view._mapNumbers(val => {
    const obj = parse(val)
    apply(obj, n)
    if (obj.num === null) {
      return val
    }
    let fmt = val.has(ordinalMatch) ? Ord : Card
    if (isText(val, obj)) {
      fmt = val.has(ordinalMatch) ? textOrdinal : textCardinal
    }
    const str = format(obj, fmt)
    if (strip) {
      val = val.not(strip)
    }
    dropPreSign(val, str)
    val.replaceWith(str, keep)
    // handle plural/singular unit
    // agreeUnits(agree, val, obj)
    return val
  }, num => operation(num, n))
  return view.update(res.pointer)
}

const addMethod = function (View) {
  /**   */
  class Numbers extends View {
    parse(n) {
      return this.getNth(n).map(parse, [])
    }
    get(n) {
      return this.getNth(n)
        .map(parse, [])
        .map(o => o.num)
    }
    json(n) {
      return jsonWith(this, n, 'number', p => {
        const { prefix, num, suffix, hasComma, unit } = parse(p)
        return { prefix, num, suffix, hasComma, unit }
      })
    }
    /** any known measurement unit, for the number */
    units() {
      return this.growRight('#Unit').match('#Unit$')
    }
    /** return values that match a given unit */
    isUnit(allowed) {
      return isUnit(this, allowed)
    }
    /** drop matches that do not parse to a usable number - like 'thousand thousand' or '21th' */
    isValid() {
      return isValid(this)
    }
    /** return only ordinal numbers */
    isOrdinal() {
      return this.if(ordinalMatch)
    }
    /** return only cardinal numbers*/
    isCardinal() {
      return this.if('#Card')
    }

    /** convert to numeric form like '8' or '8th' */
    toNumber() {
      return convert(this, Numeric,
        () => !this.has(textValueMatch),
        val => val.has(ordinalMatch) ? Ord : Card)
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
        if (val.has(ordinalMatch)) {
          num += format(obj, Ord).slice(obj.prefix.length).match(/[a-z]+/)[0]
        }
        const str = obj.prefix + num + obj.suffix
        dropPreSign(val, str)
        val.replaceWith(str, keep)
        return val
      })
      return this.update(res.pointer)
    }

    /** convert to numeric form like 'eight' or 'eighth' */
    toText() {
      return convert(this, TxtNum,
        val => val.has(textValueMatch),
        val => val.has(ordinalMatch) ? textOrdinal : textCardinal)
    }
    /** convert ordinal to cardinal form, like 'eight', or '8' */
    toCardinal() {
      return convert(this, Card,
        val => !val.has(ordinalMatch),
        val => val.has(textValueMatch) ? textCardinal : Card)
    }
    /** convert cardinal to ordinal form, like 'eighth', or '8th' */
    toOrdinal() {
      return convert(this, Ord,
        val => val.has(ordinalMatch),
        val => val.has(textValueMatch) ? textOrdinal : Ord)
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

    /** set these number to n */
    set(n) {
      if (n === undefined) {
        return this // don't bother
      }
      const set = (obj, to) => {
        obj.num = to
      }
      return edit(this, n, set, (num, to) => to, val => val.has(textValueMatch), '#Currency')
    }
    add(n) {
      if (!n) {
        return this // don't bother
      }
      // unparseable values stay as they are
      const add = (obj, by) => {
        if (obj.num !== null) {
          obj.num = this._add(obj.num, by)
        }
      }
      return edit(this, n, add, (num, by) => this._add(num, by), (val, obj) => obj.isText)
    }
    /** decrease each number by n*/
    subtract(n) {
      return this.add(n * -1)
    }
    /** increase each number by 1 */
    increment() {
      return this.add(1)
    }
    /** decrease each number by 1 */
    decrement() {
      return this.add(-1)
    }
    // Subclasses may supply decimal arithmetic.
    _add(a, b) {
      return a + b
    }
    // Let subclasses select the numeric portion of each phrase.
    _mapNumbers(fn) {
      return this.map(fn)
    }
  }
  keepClass(Numbers, 'Numbers')
  const p = Numbers.prototype
  // filter by each value, like .isEqual(n) or .between(min, max)
  const compare = test => function (a, b) {
    return this.filter(val => test(val.get(0)[0], a, b))
  }
  const equals = compare((num, n) => num === n)
  const between = compare((num, min, max) => num > min && num < max)
  Object.assign(p, {
    isEqual: equals,
    equals,
    greaterThan: compare((num, n) => num > n),
    lessThan: compare((num, n) => num < n),
    between,
    isBetween: between,
    toNice: p.toLocaleString,
    minus: p.subtract,
    plus: p.add,
  })

  View.prototype.numbers = select(Numbers, find, true)
  View.prototype.percentages = select(Numbers, doc => find(doc).filter(isPercent), true)
  // alias
  View.prototype.values = View.prototype.numbers
  return Numbers
}
export default addMethod
