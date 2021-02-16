const parse = require('./find')
const abbrevs = require('./data/_abbrevs')

module.exports = {
  /** easy getter for the start/end dates */
  get: function (options) {
    let arr = []
    this.forEach((doc) => {
      let obj = parse(doc, this.context)
      let start = obj.start ? obj.start.format('iso') : null
      let end = obj.end ? obj.end.format('iso') : null
      arr.push({ start: start, end: end })
    })
    if (typeof options === 'number') {
      return arr[options]
    }
    return arr
  },
  /** overload the original json with date information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { terms: false }
    let res = []
    let format = options.format || 'iso'
    this.forEach((doc) => {
      let json = doc.json(options)[0]
      let found = parse(doc, this.context)
      json.date = Object.assign({}, found)
      let start = found.start ? found.start.format(format) : null
      let end = found.end ? found.end.format(format) : null
      // add duration
      if (start && end) {
        json.date.duration = found.start.d.diff(found.end.d)
        // we don't need these
        delete json.date.duration.milliseconds
        delete json.date.duration.seconds
      }
      json.date.start = start
      json.date.end = end

      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },

  /** render all dates according to a specific format */
  format: function (fmt) {
    this.forEach((doc) => {
      let obj = parse(doc, this.context)
      let str = ''
      if (obj.start) {
        str = obj.start.format(fmt)
        if (obj.end) {
          let end = obj.start.format(fmt)
          if (str !== end) {
            str += ' to ' + end
          }
        }
        doc.replaceWith(str, { keepTags: true, keepCase: false })
      }
    })
    return this
  },
  /** replace 'Fri' with 'Friday', etc*/
  toLongForm: function () {
    abbrevs.forEach((a) => {
      this.replace(a.short, a.long, true)
    })
    return this
  },
  /** replace 'Friday' with 'Fri', etc*/
  toShortForm: function () {
    abbrevs.forEach((a) => {
      this.replace(a.long, a.short, true)
    })
    return this
  },
}
