import find from './find.js'
import parse from './parse.js'
import mapNumbers from './_lib.js'

const plugin = function (View, Numbers) {
  /**
   */
  class Money extends Numbers {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Money'
    }
    _mapNumbers(fn) {
      return mapNumbers(this, fn)
    }
    parse(n) {
      return this.getNth(n).map(parse, [])
    }
    get(n) {
      return this.parse(n).map(p => p.num)
    }
    json(n) {
      const opts = typeof n === 'object' ? n : {}
      return this.getNth(n).map(p => {
        const json = p.toView().json(opts)[0]
        const parsed = parse(p)
        json.money = parsed
        return json
      }, [])
    }
    currency(n) {
      return this.parse(n).map(p => p.currency)
    }
  }

  // These conversions do not describe monetary amounts.
  Object.assign(Money.prototype, {
    toOrdinal: undefined,
    toCardinal: undefined,
    toFraction: undefined,
    toPercentage: undefined,
    toDecimal: undefined,
  })

  View.prototype.money = function (n) {
    let m = find(this)
    m = m.getNth(n)
    return new Money(this.document, m.pointer)
  }
}

export default plugin
