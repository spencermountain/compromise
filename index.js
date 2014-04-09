// ties the files together for server-side use
// the gruntfile concatenates them for client-side
exports.sentences = require('./lib/tokenization/sentence').sentences;

exports.ngram = require('./lib/tokenization/ngram');

var l = require('./lib/localization/britishize')
exports.americanize = l.americanize;
exports.britishize = l.britishize;

var l = require('./lib/inflection/inflect')
exports.pluralize = l.pluralize;
exports.singularize = l.singularize;

exports.syllables = require('./lib/hyphenization/syllable').syllables;

exports.adj_to_noun = require('./lib/conjugation/adj_to_noun').adj_to_noun;

exports.conjugate_verb = require('./lib/conjugation/verb/conjugate').conjugate;

exports.dates = require('./lib/spotting/date_parser');

var l = require('./lib/transliteration/unicode_normalisation')
exports.normalize = l.normalize
exports.denormalize = l.denormalize

exports.tag = require('./lib/tagging/tagger');
var spot_function = require('./lib/spotting/spotter');
exports.spot = function(text, options) {
	var tags = exports.tag(text, options)
	return spot_function(tags, options)
}
exports.tests = require('./test');

// console.log(exports.spot("the chimmney was really tall"))
// exports.tests()