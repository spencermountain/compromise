import find from './find.js'
import parse from './parse.js'

const addMethod = function (View) {
  /**
   *
   */
  class Numbers extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Numbers'
    }
    parse(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(parse)
    }
    get(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(parse).map(o => o.num)
    }
    json(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(p => {
        let json = p.json()[0]
        let parsed = parse(p)
        json.number = {
          prefix: parsed.prefix,
          num: parsed.num,
          suffix: parsed.suffix,
          hasComma: parsed.hasComma,
        }
        return json
      })
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
      this.forEach(val => {
        let obj = parse(val)
        if (obj.num === null) {
          return
        }
        let str = makeNumber(obj, false, val.has('#Ordinal'))
        val.replaceWith(str, true)
        val.tag('NumericValue')
      })
      return this
    }
  }

  View.prototype.numbers = function (n) {
    let m = find(this)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Numbers(this.document, m.pointer)
  }
  // alias
  View.prototype.values = View.prototype.numbers
}
export default addMethod
