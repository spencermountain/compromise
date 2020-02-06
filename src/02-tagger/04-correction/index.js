const fixMisc = require('./fixMisc')
const runAlways = require('./runAlways')
const runner = require('./runner')

// runner: 349.555ms
// always: 49.923ms
// misc: 49.780ms

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  // console.time('all')
  // console.time('runner')
  runner(doc)
  // console.timeEnd('runner')

  // console.time('always')
  runAlways(doc)
  // console.timeEnd('always')

  // console.time('misc')
  fixMisc(doc) //43
  // console.timeEnd('misc')
  // console.timeEnd('all')
  return doc
}
module.exports = corrections
