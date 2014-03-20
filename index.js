// ties the files together for server-side use
// the gruntfile concatenates them for client-side
exports.sentences = require('./lib/tokenization/sentence').sentences;

exports.ngram = require('./lib/tokenization/ngram');

exports.americanize = require('./lib/localization/britishize').americanize;
exports.britishize = require('./lib/localization/britishize').britishize;

exports.pluralize = require('./lib/inflection/inflect').pluralize;
exports.singularize = require('./lib/inflection/inflect').singularize;

exports.syllables = require('./lib/hyphenization/syllable').syllables;

exports.adj_to_noun = require('./lib/conjugation/adj_to_noun').adj_to_noun;

exports.dates = require('./lib/spotting/date_parser');

exports.tag = require('./lib/tagging/tagger');
var spot_function = require('./lib/spotting/spotter');
exports.spot = function(text, options) {
	var tags = exports.tag(text, options)
	return spot_function(tags, options)
}
exports.tests = require('./test');

// console.log(exports.spot("the chimmney was really tall"))
// exports.tests()