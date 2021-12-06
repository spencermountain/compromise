import find from './find/index.js'
import parseRange from './parse/range/index.js'

const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)


const toJSON = function (range) {
  range = range[0]//oof
  return {
    start: range.start.format('iso'),
    end: range.end.format('iso')
  }
}

const api = function (View) {

  class Dates extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }

    get(n) {
      return getNth(this, n).map(parseRange)
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.dates !== true) {
          let parsed = parseRange(m)
          json.dates = toJSON(parsed)
        }
        return json
      }, [])
    }
  }

  View.prototype.dates = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Dates(this.document, m.pointer)
  }
}

export default api