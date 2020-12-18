const parse = require('./find')
const abbrevs = require('./data/_abbrevs')

module.exports = {
  /** overload the original json with noun information */
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
      let obj = parse(doc, this.context)
      let start = obj.start ? obj.start.format(format) : null
      let end = obj.end ? obj.end.format(format) : null
      // set iso strings to json result
      json.date = {
        start: start,
        end: end,
      }
      // add duration
      if (start && end) {
        json.date.duration = obj.start.d.diff(obj.end.d)
        // we don't need these
        delete json.date.duration.milliseconds
        delete json.date.duration.seconds
      }
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
