const compile = require('./compile')
const bulkMatch = require('./matcher')
const bulkTagger = require('./tagger')

module.exports = {
  compile: compile,
  bulkMatch: bulkMatch,
  bulkTagger: bulkTagger,
}
