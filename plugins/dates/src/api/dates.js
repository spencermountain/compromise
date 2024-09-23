import find from './find/index.js'
import parseDates from './parse/index.js'
import toJSON from './toJSON.js'

const quickDate = function (view, str) {
  let tmp = view.fromText(str)
  let found = parseDates(tmp, view.opts)[0]
  if (!found || !found.start || !found.start.d) {
    return null
  }
  return found.start.d
}

const api = function (View) {
  class Dates extends View {
    constructor(document, pointer, groups, opts = {}) {
      super(document, pointer, groups)
      this.viewType = 'Dates'
      this.opts = Object.assign({}, opts)
    }

    get(n) {
      let all = []
      this.forEach(m => {
        parseDates(m, this.opts).forEach(res => {
          let json = toJSON(res)
          if (json.start) {
            all.push(json)
          }
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
        if (opts && opts.dates !== false) {
          let parsed = parseDates(m, this.opts)
          if (parsed.length > 0) {
            json.dates = toJSON(parsed[0])
          }
        }
        return json
      }, [])
    }

    /** replace date terms with a formatted date */
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

    /** return only dates occuring before a given date  */
    isBefore(iso) {
      let pivot = quickDate(this, iso)
      return this.filter(m => {
        let obj = parseDates(m, this.opts)[0] || {}
        return obj.start && obj.start.d && obj.start.d.isBefore(pivot)
      })
    }
    /** return only dates occuring after a given date  */
    isAfter(iso) {
      let pivot = quickDate(this, iso)
      return this.filter(m => {
        let obj = parseDates(m, this.opts)[0] || {}
        return obj.start && obj.start.d && obj.start.d.isAfter(pivot)
      })
    }
    /** return only dates occuring after a given date  */
    isSame(unit, iso) {
      let pivot = quickDate(this, iso)
      return this.filter(m => {
        let obj = parseDates(m, this.opts)[0] || {}
        return obj.start && obj.start.d && obj.start.d.isSame(pivot, unit)
      })
    }
  }

  View.prototype.dates = function (opts) {
    let m = find(this)
    return new Dates(this.document, m.pointer, null, opts)
  }
}

export default api
