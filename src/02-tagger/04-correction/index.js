const fixMisc = require('./fixMisc')
const fixDeterminer = require('./fixThe')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixValue = require('./fixValue')
const fixDates = require('./fixDates')
const list = require('./_corrections')

const runAll = function(doc) {
  list.forEach(c => {
    // if (doc.has(c[0])) {
    //   console.log(c[0])
    // }
    // console.log(c[0])
    doc.match(c[0], c[1]).tag(c[2], c[3])
  })
}

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  fixDeterminer(doc) //27
  fixNouns(doc) //30
  fixPerson(doc) //58
  fixVerb(doc) //50
  fixValue(doc) //12
  fixDates(doc) //92
  fixMisc(doc) //43
  runAll(doc)
  return doc
}
module.exports = corrections
