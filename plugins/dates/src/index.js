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
      let res = []
      this.forEach(doc => {
        let json = doc.json(options)[0]
        json.date = parse(doc)
        res.push(json)
      })
      if (n !== null) {
        return res[n]
      }
      return res
    }
    format(str) {}
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
