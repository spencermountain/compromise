const tagger = require('./tagger')
const tags = require('./tags')
const words = require('./words')
const parse = require('./parse')
const abbrevs = require('./abbrevs')

const addMethods = function(Doc, world) {
  // our new tags
  world.addTags(tags)
  // add info for the date plugin
  world.addWords(words)
  // run our tagger
  world.postProcess(tagger)

  /**  */
  class Dates extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.context = {}
    }
    /** overload the original json with noun information */
    json(options) {
      let n = null
      if (typeof options === 'number') {
        n = options
        options = null
      }
      options = options || { terms: false }
      let res = []
      let format = options.format || 'iso'
      this.forEach(doc => {
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
    }

    /** render all dates according to a specific format */
    format(fmt) {
      this.forEach(doc => {
        let obj = parse(doc, this.context)
        let str = ''
        if (obj.start) {
          str = obj.start.format(fmt)
          if (obj.end) {
            str += ' to ' + obj.start.format(fmt)
          }
          doc.replaceWith(str, { keepTags: true, keepCase: false })
        }
      })
      return this
    }
    /** replace 'Fri' with 'Friday', etc*/
    toLongForm() {
      abbrevs.forEach(a => {
        this.replace(a.short, a.long, true)
      })
      return this
    }
    /** replace 'Friday' with 'Fri', etc*/
    toShortForm() {
      abbrevs.forEach(a => {
        this.replace(a.long, a.short, true)
      })
      return this
    }
  }

  Doc.prototype.dates = function(n) {
    let context = {}
    if (n && typeof n === 'object') {
      context = n
      n = null
    }
    let r = this.clauses()
    let dates = r.match('#Date+')
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    let d = new Dates(dates.list, this, this.world)
    d.context = context
    return d
  }
}

module.exports = addMethods
