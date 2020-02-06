const fixMisc = require('./fixMisc')
const fixVerb = require('./fixVerb')
const fixDates = require('./fixDates')
const runAlways = require('./runAlways')
const runner = require('./runner')

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  // console.time('corrections')
  // console.time('runner')
  runner(doc)
  // console.timeEnd('runner')

  // console.time('always')
  runAlways(doc)
  // console.timeEnd('always')

  // console.time('verb')
  fixVerb(doc) //50
  // console.timeEnd('verb')
  // console.time('dates')
  fixDates(doc) //92
  // console.timeEnd('dates')
  // console.time('misc')
  fixMisc(doc) //43
  // console.timeEnd('misc')
  // console.timeEnd('corrections')
  return doc
}
module.exports = corrections
