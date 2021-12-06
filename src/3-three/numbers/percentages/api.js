import find from './find.js'
import parseNumber from '../numbers/parse/index.js'
import { getNth } from '../../chunker/api/_lib.js'

const parse = function (m) {
  let num = parseNumber(m).num
  if (typeof num === 'number') {
    return num / 100
  }
  return null
}

const plugin = function (View) {
  /**
   */
  class Percentages extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Percentages'
    }
    parse(n) {
      return getNth(this, n).map(parse)
    }
    get(n) {
      return getNth(this, n).map(parse)
    }
    json(n) {
      return getNth(this, n).map(p => {
        let json = p.toView().json()[0]
        let decimal = parse(p)
        let full = decimal * 100
        json.fraction = {
          decimal,
          textNumber: `${full} percent`,
          cardinal: `${full}%`,
        }
        return json
      }, [])
    }
  }

  View.prototype.percentages = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Percentages(this.document, m.pointer)
  }
}

export default plugin
