const tagger = require('./01-tagger')
const findDates = require('./02-find')
const tags = require('./data/_tags')
const words = require('./data/words')
const methods = require('./methods')
const addDurations = require('./durations')
const addTimes = require('./times')
const spacetime = require('spacetime')

const opts = {
  punt: { weeks: 2 },
}

const addMethods = function (Doc, world) {
  // our new tags
  world.addTags(tags)
  // add info for the date plugin
  world.addWords(words)
  // run our tagger
  world.postProcess(tagger)

  // add .durations() class + methods
  addDurations(Doc, world)
  // add .times() class + methods
  addTimes(Doc, world)

  /** phraes like 'nov 2nd' or 'on tuesday' */
  class Dates extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.context = opts
    }
  }
  //add-in methods
  Object.assign(Dates.prototype, methods)

  Doc.prototype.dates = function (n) {
    let context = {}
    if (n && typeof n === 'object') {
      context = n
      n = null
    }
    context = Object.assign({}, context, opts)
    // use the user's timezone, by default
    if (context.timezone === undefined) {
      context.timezone = spacetime().timezone().name
    }
    // allow null to mean utc
    if (context.timezone === false) {
      context.timezone = 'ETC/UTC'
    }
    let dates = findDates(this)
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    let d = new Dates(dates.list, this, this.world)
    if (context.today) {
      context.today = spacetime(context.today, context.timezone)
    }
    d.context = context
    return d
  }
}

module.exports = addMethods
