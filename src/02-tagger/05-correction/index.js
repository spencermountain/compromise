const fixMisc = require('./fixMisc')
const fixDeterminer = require('./fixThe')
const fixNouns = require('./fixNouns')
const fixPerson = require('./fixPerson')
const fixVerb = require('./fixVerb')
const fixAdjective = require('./fixAdjective')
const fixValue = require('./fixValue')

//sequence of match-tag statements to correct mis-tags
const corrections = function(doc) {
  if (doc.has('#Determiner')) {
    fixDeterminer(doc)
  }
  if (doc.has('#Noun')) {
    fixNouns(doc)
    fixPerson(doc)
  }
  if (doc.has('#Verb')) {
    fixVerb(doc)
  }
  if (doc.has('#Adjective')) {
    fixAdjective(doc)
  }
  if (doc.has('#Value')) {
    fixValue(doc)
  }
  fixMisc(doc)
  return doc
}
module.exports = corrections
