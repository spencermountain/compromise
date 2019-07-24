const fixMisc = require('./fixMisc')
const fixDeterminer = require('./fixThe')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixAdjective = require('./fixAdjective')
const fixValue = require('./fixValue')
const fixDates = require('./fixDates')

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  fixDeterminer(doc)
  fixNouns(doc)
  fixPerson(doc)
  fixVerb(doc)
  fixAdjective(doc)
  fixValue(doc)
  // fixDates(doc)
  fixMisc(doc)
  return doc
}
module.exports = corrections
