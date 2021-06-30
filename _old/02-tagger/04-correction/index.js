const fixMisc = require('./fixMisc')
const runner = require('./runner')

// runner: 250ms
// misc: 40ms

//sequence of match-tag statements to correct mis-tags
const corrections = function (doc) {
  runner(doc)
  fixMisc(doc)
  return doc
}
module.exports = corrections
