import select from '../../_select.js'
import find from './find.js'
import parse from './parse.js'
import mapNumbers from './_lib.js'
import { jsonWith } from '../../_lib.js'
import { add } from './_decimal.js'

const plugin = function (View, Numbers) {
  /**
   */
  class Money extends Numbers {
    _mapNumbers(fn, operation) {
      return mapNumbers(this, fn, operation)
    }
    parse(n) {
      return this.getNth(n).map(parse, [])
    }
    get(n) {
      return this.parse(n).map(p => p.num)
    }
    json(n) {
      return jsonWith(this, n, 'money', parse)
    }
    currency(n) {
      return this.parse(n).map(p => p.currency)
    }
  }
  Money.prototype.viewType = 'Money'

  // These conversions do not describe monetary amounts.
  Object.assign(Money.prototype, {
    _add: add,
    toOrdinal: undefined,
    toCardinal: undefined,
    toFraction: undefined,
    toPercentage: undefined,
    toDecimal: undefined,
  })

  View.prototype.money = select(Money, find, true)
}

export default plugin
