const fixMisc = require('./fixMisc')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
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

  // console.time('nouns')
  fixNouns(doc) //30
  // console.timeEnd('nouns')
  // console.time('person')
  fixPerson(doc) //58
  // console.timeEnd('person')
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
