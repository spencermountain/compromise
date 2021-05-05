let matches = []
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/01-misc'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/02-dates'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/03-adjective'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/04-noun'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/05-adverb'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/06-value'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/07-verbs'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/08-place'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/09-org'))
matches = matches.concat(require('../../src/02-tagger/04-correction/matches/10-people'))

module.exports = matches
