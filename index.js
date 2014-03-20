// ties the files together for server-side use
// the gruntfile concatenates them for client-side
exports.sentences = require('./tokenization/sentence').sentences;

exports.ngram = require('./tokenization/ngram');

exports.americanize = require('./localization/britishize').americanize;
exports.britishize = require('./localization/britishize').britishize;

exports.pluralize = require('./inflection/inflect').pluralize;
exports.singularize = require('./inflection/inflect').singularize;

exports.syllables = require('./hyphenization/syllable').syllables;

exports.adj_to_noun = require('./conjugation/adj_to_noun').adj_to_noun;

exports.dates = require('./spotting/date_parser');

exports.tag = require('./tagging/tagger');
var spot_function = require('./spotting/spotter');
exports.spot = function(text, options) {
	var tags = exports.tag(text, options)
	return spot_function(tags, options)
}
exports.tests = require('./test');

// console.log(exports.spot("the chimmney was really tall"))
// exports.tests()