import find from './find/index.js'
import parseDate from './parse/one/index.js'

const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)


const toJSON = function (parsed) {
  console.log(parsed)
  return {}
}

const api = function (View) {

  class Dates extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }

    parse(n) {
      console.log('=-=-=-= here -=-=-=-')
      return getNth(this, n).map(parseDate)
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.dates !== true) {
          let parsed = parseDate(m)
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