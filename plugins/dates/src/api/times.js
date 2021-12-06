import normalize from './normalize.js'
import parseTime from './parse/one/01-tokenize/03-time.js'


const find = function (doc) {
  return doc.match('#Time+ (am|pm)?')
}

const parse = function (m, context = {}) {
  // m = normalize(m)
  let time = parseTime(m, context)
  return time
}

const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Times extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }

    get(n) {
      return getNth(this, n).map(parse)
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.times !== true) {
          json.time = parse(m)
        }
        return json
      }, [])
    }
  }

  View.prototype.times = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Times(this.document, m.pointer)
  }
}

export default api