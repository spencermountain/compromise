import normalize from './normalize.js'
import parseTime from './parse/one/01-tokenize/03-time.js'
import spacetime from 'spacetime'

const find = function (doc) {
  return doc.match('#Time+ (am|pm)?')
}

const parse = function (m, context = {}) {
  m = normalize(m)
  let res = parseTime(m, context)
  if (!res.result) {
    return { time: null, '24h': null }
  }
  let s = spacetime.now().time(res.result)
  return {
    time: res.result,
    '24h': s.format('time-24'),
    hour: s.hour(),
    minute: s.minute(),
  }
}

const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Times extends View {
    constructor(document, pointer, groups, opts) {
      super(document, pointer, groups)
      this.viewType = 'Times'
      this.opts = opts || {}
    }

    format(fmt) {
      let found = this
      let res = found.map(m => {
        let obj = parse(m) || {}
        if (obj.time) {
          let s = spacetime.now().time(obj.time)
          let str = obj.time
          if (fmt === '24h') {
            str = s.format('time-24')
          } else {
            str = s.format(fmt)
          }
          m = m.not('#Preposition')
          m.replaceWith(str)
        }
        return m
      })
      return new Times(this.document, res.pointer, null, this.opts)
    }

    get(n) {
      return getNth(this, n).map(parse)
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.time !== false) {
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
