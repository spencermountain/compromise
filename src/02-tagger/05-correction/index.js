const fixMisc = require('./fixMisc')
const fixDeterminer = require('./fixThe')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixAdjective = require('./fixAdjective')
const fixValue = require('./fixValue')
const fixDates = require('./fixDates')

// det: 131.338ms
// verb: 100.828ms
// dates: 80.874ms
// person: 66.054ms
// nouns: 51.340ms
// adj: 19.760ms
// value: 12.950ms
// misc: 43.359ms

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  // console.time('det')
  fixDeterminer(doc)
  // console.timeEnd('det')

  // console.time('nouns')
  fixNouns(doc)
  // console.timeEnd('nouns')

  // console.time('person')
  fixPerson(doc)
  // console.timeEnd('person')

  // console.time('verb')
  fixVerb(doc)
  // console.timeEnd('verb')

  // console.time('adj')
  fixAdjective(doc)
  // console.timeEnd('adj')

  // console.time('value')
  fixValue(doc)
  // console.timeEnd('value')

  // console.time('dates')
  fixDates(doc)
  // console.timeEnd('dates')

  // console.time('misc')
  fixMisc(doc)
  // console.timeEnd('misc')
  return doc
}
module.exports = corrections
