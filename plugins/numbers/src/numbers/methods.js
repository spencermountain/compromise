const parseNumber = require('./parse')
const agreeUnits = require('./_agreeUnits')
const makeNumber = require('./convert/makeNumber')
const toNumber = require('./convert/toNumber')

let methods = {
  /** overloaded json method with additional number information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach((doc) => {
      let json = doc.json(options)[0]
      let obj = parseNumber(doc)
      json.prefix = obj.prefix
      json.number = obj.num
      json.suffix = obj.suffix
      json.cardinal = makeNumber(obj, false, false)
      json.ordinal = makeNumber(obj, false, true)
      json.textCardinal = makeNumber(obj, true, false)
      json.textOrdinal = makeNumber(obj, true, true)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },
  /** two of what? */
  units: function () {
    let m = this.lookAhead('(#Unit|#Noun)+')
    m = m.splitAfter('@hasComma').first()
    m = m.not('#Pronoun')
    return m.first()
  },
  /** return only ordinal numbers */
  isOrdinal: function () {
    return this.if('#Ordinal')
  },
  /** return only cardinal numbers*/
  isCardinal: function () {
    return this.if('#Cardinal')
  },
  /** convert to numeric form like '8' or '8th' */
  toNumber: function () {
    this.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str, true)
      val.tag('NumericValue')
    })
    return this
  },
  /** add commas, or nicer formatting for numbers */
  toLocaleString: function () {
    this.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      obj.num = obj.num.toLocaleString()
      let str = makeNumber(obj, false, val.has('#Ordinal'))
      val.replaceWith(str, true)
    })
    return this
  },
  /** convert to text form - like 'eight' or 'eigth'*/
  toText: function () {
    this.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, true, val.has('#Ordinal'))
      val.replaceWith(str, true)
      val.tag('TextValue')
    })
    return this
  },
  /** convert to cardinal form, like 'eight', or '8' */
  toCardinal: function (agree) {
    let m = this.if('#Ordinal')
    m.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), false)
      // a hack for number-ranges
      if (val.has('#NumberRange')) {
        let t = val.termList()[0]
        if (t.text && t.post === '') {
          t.post = ' '
        }
      }
      // change the number text
      val.replaceWith(str, true)
      val.tag('Cardinal')
      // turn unit into plural -> 'seven beers'
      agreeUnits(agree, val, obj)
    })
    return this
  },
  /** convert to ordinal form, like 'eighth', or '8th' */
  toOrdinal: function () {
    let m = this.if('#Cardinal')
    m.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), true)
      // a hack for number-ranges
      if (val.has('#NumberRange')) {
        let t = val.termList()[0]
        if (t.text && t.post === '') {
          t.post = ' '
        }
      }
      // change the number text
      val.replaceWith(str, true)
      val.tag('Ordinal')
      // turn unit into singular -> 'seventh beer'
      let unit = this.lookAhead('^#Plural')
      if (unit.found) {
        unit.nouns().toSingular()
      }
    })
    return this
  },
  /** return only numbers that are == n */
  isEqual: function (n) {
    return this.filter((val) => {
      let num = parseNumber(val).num
      return num === n
    })
  },
  /** return only numbers that are > n*/
  greaterThan: function (n) {
    return this.filter((val) => {
      let num = parseNumber(val).num
      return num > n
    })
  },
  /** return only numbers that are < n*/
  lessThan: function (n) {
    return this.filter((val) => {
      let num = parseNumber(val).num
      return num < n
    })
  },
  /** return only numbers > min and < max */
  between: function (min, max) {
    return this.filter((val) => {
      let num = parseNumber(val).num
      return num > min && num < max
    })
  },
  /** set these number to n */
  set: function (n, agree) {
    if (n === undefined) {
      return this // don't bother
    }
    if (typeof n === 'string') {
      n = toNumber(n)
    }
    this.forEach((val) => {
      let obj = parseNumber(val)
      obj.num = n
      if (obj.num === null) {
        return
      }
      let str = makeNumber(obj, val.has('#TextValue'), val.has('#Ordinal'))
      val = val.not('#Currency')
      val.replaceWith(str, true)
      // handle plural/singular unit
      agreeUnits(agree, val, obj)
    })
    return this
  },
  add: function (n, agree) {
    if (!n) {
      return this // don't bother
    }
    if (typeof n === 'string') {
      n = toNumber(n)
    }
    this.forEach((val) => {
      let obj = parseNumber(val)

      if (obj.num === null) {
        return
      }
      obj.num += n
      let str = makeNumber(obj, val.has('#TextValue'), val.has('#Ordinal'))
      val = val.not('#Currency')
      val.replaceWith(str, true)
      // handle plural/singular unit
      agreeUnits(agree, val, obj)
    })
    return this
  },
  /** decrease each number by n*/
  subtract: function (n, agree) {
    return this.add(n * -1, agree)
  },
  /** increase each number by 1 */
  increment: function (agree) {
    this.add(1, agree)
    return this
  },
  /** decrease each number by 1 */
  decrement: function (agree) {
    this.add(-1, agree)
    return this
  },
  /** return things like CCXX*/
  romanNumerals: function (n) {
    let m = this.match('#RomanNumeral').numbers()
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return m
  },
  /** split-apart suffix and number */
  normalize: function () {
    const keep = {
      '%': true,
    }
    this.forEach((val) => {
      let obj = parseNumber(val)
      if (obj.num !== null && obj.suffix && keep[obj.suffix] !== true) {
        let prefix = obj.prefix || ''
        val = val.replaceWith(prefix + obj.num + ' ' + obj.suffix)
        return
      }
    })
    return this
  },
  /** retrieve the parsed number */
  get: function (n) {
    let arr = []
    this.forEach((doc) => {
      arr.push(parseNumber(doc).num)
    })
    if (n !== undefined) {
      return arr[n]
    }
    return arr
  },
}
// aliases
methods.toNice = methods.toLocaleString
methods.isBetween = methods.between
methods.minus = methods.subtract
methods.plus = methods.add
methods.equals = methods.isEqual

module.exports = methods
