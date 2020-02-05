const fixMisc = require('./fixMisc')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixDates = require('./fixDates')
const list = require('./_corrections')

const runAll = function(doc) {
  list.forEach(c => {
    // tagsafe
    if (c[4] === true) {
      doc.match(c[0], c[1]).tagSafe(c[2], c[3])
    } else {
      doc.match(c[0], c[1]).tag(c[2], c[3])
    }
  })
}

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  runAll(doc)
  fixNouns(doc) //30
  fixPerson(doc) //58
  fixVerb(doc) //50
  fixDates(doc) //92
  fixMisc(doc) //43
  return doc
}
module.exports = corrections
