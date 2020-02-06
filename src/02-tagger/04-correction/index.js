const fixMisc = require('./fixMisc')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixDates = require('./fixDates')
const runAlways = require('./runAlways')
const runner = require('./runner')

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  runner(doc)
  runAlways(doc)

  fixNouns(doc) //30
  fixPerson(doc) //58
  fixVerb(doc) //50
  fixDates(doc) //92
  fixMisc(doc) //43
  return doc
}
module.exports = corrections
