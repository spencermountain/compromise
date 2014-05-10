// ties the files together for server-side use
// the gruntfile concatenates them for client-side

//tokenization
exports.sentences = require('./src/pos/tokenization/sentence').sentences;
exports.tokenize = require('./src/pos/tokenization/tokenize').tokenize;
exports.ngram = require('./src/pos/tokenization/ngram').ngram;

//hyphenization
exports.syllables = require('./src/methods/hyphenization/syllable').syllables;

//localization
var l = require('./src/methods/localization/britishize')
exports.americanize = l.americanize;
exports.britishize = l.britishize;

//conjugate
exports.noun = {
	singularize: require('./src/nouns/conjugate/inflect').singularize,
	pluralize: require('./src/nouns/conjugate/inflect').pluralize,
}
exports.adjective = {
	to_noun: require('./src/adjectives/conjugate/to_noun').adj_to_noun
}
exports.verb = {
	conjugate: require('./src/verbs/conjugate/conjugate').conjugate
}

//mining
exports.dates = require('./src/values/dates');

//tranliteration
var l = require('./src/methods/transliteration/unicode_normalisation')
exports.normalize = l.normalize
exports.denormalize = l.denormalize

exports.pos = require('./src/pos/pos').pos;

// var spot_function = require('./src/spotting/spotter');
// exports.spot = function(text, options) {
// 	var tags = exports.tag(text, options)
// 	return spot_function(tags, options)
// }
exports.tests = require('./test');

// console.log(exports.pos("the chimmney was really tall"))
// exports.tests()