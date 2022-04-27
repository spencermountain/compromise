import find from './find/index.js'
import parseDates from './parse/index.js'
import toJSON from './toJSON.js'


const api = function (View) {

  class Dates extends View {
    constructor(document, pointer, groups, opts = {}) {
      super(document, pointer, groups)
      this.viewType = 'Dates'
      this.opts = opts
    }

    get(n) {
      let all = []
      this.forEach((m) => {
        parseDates(m, this.opts).forEach(res => {
          all.push(toJSON(res))
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
          let parsed = parseDates(m, this.opts)
          json.dates = toJSON(parsed[0])
        }
        return json
      }, [])
    }

    format(fmt) {
      let found = this
      let res = found.map(m => {
        let obj = parseDates(m, this.opts)[0] || {}
        if (obj.start) {
          let start = obj.start.d
          let str = start.format(fmt)
          if (obj.end) {
            let end = obj.end.d
            if (start.isSame(end, 'day') === false) {
              str += ' to ' + end.format(fmt)
            }
          }
          m.replaceWith(str)
        }
        return m
      })
      return new Dates(this.document, res.pointer, null, this.opts)
    }
  }

  View.prototype.dates = function (opts) {
    let m = find(this)
    return new Dates(this.document, m.pointer, null, opts)
  }
}

export default api