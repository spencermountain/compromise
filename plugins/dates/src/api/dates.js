import find from './find/index.js'
import parseRange from './parse/range/index.js'

const toJSON = function (range) {
  range = range[0]//oof
  return {
    start: range.start ? range.start.format('iso') : null,
    end: range.end ? range.end.format('iso') : null
  }
}

const api = function (View) {

  class Dates extends View {
    constructor(document, pointer, groups, opts = {}) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
      this.opts = opts
    }

    get(n) {
      let all = []
      this.forEach((m) => {
        parseRange(m, this.opts).forEach(res => {
          all.push({
            start: res.start.format('iso'),
            end: res.end.format('iso')
          })
        })
      })
      if (typeof n === 'number') {
        return all[n]
      }
      return all
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.dates !== true) {
          let parsed = parseRange(m, this.opts)
          json.dates = toJSON(parsed)
        }
        return json
      }, [])
    }
  }

  View.prototype.dates = function (opts) {
    let m = find(this)
    return new Dates(this.document, m.pointer, null, opts)
  }
}

export default api