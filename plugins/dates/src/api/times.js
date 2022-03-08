// import normalize from './normalize.js'
import parseTime from './parse/one/01-tokenize/03-time.js'
import spacetime from 'spacetime'


const find = function (doc) {
  return doc.match('#Time+ (am|pm)?')
}

const parse = function (m, context = {}) {
  let res = parseTime(m, context)
  if (!res.result) {
    return { time: null, '24h': null }
  }
  let s = spacetime.now().time(res.result)
  return {
    'time': res.result,
    '24h': s.format('time-24'),
    hour: s.hour(),
    minute: s.minute()
  }
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