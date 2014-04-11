// ties the files together for server-side use
// the gruntfile concatenates them for client-side

//tokenization
exports.sentences = require('./lib/tokenization/sentence').sentences;
exports.tokenize = require('./lib/tokenization/tokenize').tokenize;
exports.ngram = require('./lib/tokenization/ngram').ngram;

//hyphenization
exports.syllables = require('./lib/hyphenization/syllable').syllables;

//localization
var l = require('./lib/localization/britishize')
exports.americanize = l.americanize;
exports.britishize = l.britishize;

//conjugation
exports.noun = {
	singularize: require('./lib/conjugation/noun/inflect').singularize,
	pluralize: require('./lib/conjugation/noun/inflect').pluralize,
}
exports.adjective = {
	to_noun: require('./lib/conjugation/adjective/to_noun').adj_to_noun
}
exports.verb = {
	to_noun: require('./lib/conjugation/verb/conjugate').conjugate
}

//mining
exports.dates = require('./lib/mining/date_parser');

//tranliteration
var l = require('./lib/transliteration/unicode_normalisation')
exports.normalize = l.normalize
exports.denormalize = l.denormalize

exports.pos = require('./lib/pos/pos').pos;

// var spot_function = require('./lib/spotting/spotter');
// exports.spot = function(text, options) {
// 	var tags = exports.tag(text, options)
// 	return spot_function(tags, options)
// }
exports.tests = require('./test');

// console.log(exports.spot("the chimmney was really tall"))
// exports.tests()