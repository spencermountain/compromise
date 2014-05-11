// ties the files together for server-side use
// the gruntfile concatenates them for client-side

//nouns
exports.noun = {
	singularize: require('./src/nouns/conjugate/inflect').singularize,
	pluralize: require('./src/nouns/conjugate/inflect').pluralize,
	article: require('./src/nouns/indefinite_article/indefinite_article')
}
//adjectives
exports.adjective = {
	to_noun: require('./src/adjectives/conjugate/to_noun').adj_to_noun,
	to_adverb: require('./src/adjectives/conjugate/to_adverb'),
}
//verbs
exports.verb = {
	conjugate: require('./src/verbs/conjugate/conjugate').conjugate
}

//adverbs
exports.adverb = {
	to_adjective: require('./src/adverbs/conjugate/to_adjective')
}


//other methods
////////////


//tokenization
exports.sentences = require('./src/pos/tokenization/sentence').sentences;
exports.tokenize = require('./src/pos/tokenization/tokenize').tokenize;
exports.ngram = require('./src/pos/tokenization/ngram').ngram;

//mining of specific types of values
exports.dates = require('./src/values/dates');
exports.to_number = require('./src/values/to_number');

//tranliteration
var l = require('./src/methods/transliteration/unicode_normalisation')
exports.normalize = l.normalize
exports.denormalize = l.denormalize

//syllable splitting (hyphenization)
exports.syllables = require('./src/methods/syllables/syllable');

//localization
var l = require('./src/methods/localization/britishize')
exports.americanize = l.americanize;
exports.britishize = l.britishize;

//part of speech tagging
exports.pos = require('./src/pos/pos').pos;


// var spot_function = require('./src/spotting/spotter');
// exports.spot = function(text, options) {
// 	var tags = exports.tag(text, options)
// 	return spot_function(tags, options)
// }
exports.tests = require('./tests/test');

// console.log(exports.pos("the chimmney was really tall"))
// exports.tests()