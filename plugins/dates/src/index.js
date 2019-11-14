const tagger = require('./tagger')
const tags = require('./tags')
const words = require('./words')
const parse = require('./parse')

const addMethods = function(Doc, world) {
  // our new tags
  world.addTags(tags)
  // add info for the date plugin
  world.addWords(words)
  // run our tagger
  world.postProcess(tagger)

  /**  */
  class Dates extends Doc {
    /** overload the original json with noun information */
    json(options) {
      let n = null
      if (typeof options === 'number') {
        n = options
        options = null
      }
      options = options || { terms: false }
      let res = []
      this.forEach(doc => {
        let json = doc.json(options)[0]
        let obj = parse(doc)
        json.date = {
          start: obj.start ? obj.start.format('nice-full') : null,
          end: obj.end ? obj.end.format('nice-full') : null,
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
        let obj = parse(doc)
        let str = ''
        if (obj.start) {
          str = obj.start.format(fmt)
        }
        if (obj.end) {
          str += ' to ' + obj.start.format(fmt)
        }
        doc.replaceWith(str, true)
      })
      return this
    }
  }

  Doc.prototype.dates = function(n) {
    let r = this.clauses()
    let dates = r.match('#Date+')
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    return new Dates(dates.list, this, this.world)
  }
}

module.exports = addMethods
