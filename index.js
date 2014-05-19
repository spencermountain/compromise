// ties the files together for server-side use
// the gruntfile concatenates them for client-side

exports.noun = require('./src/parents/noun/index')
exports.adjective = require('./src/parents/adjective/index')
exports.verb = require('./src/parents/verb/index')
exports.adverb = require('./src/parents/adverb/index')
exports.value = require('./src/parents/value/index')


//other methods
////////////

//tokenization
exports.sentences = require('./src/methods/tokenization/sentence').sentences;
exports.tokenize = require('./src/methods/tokenization/tokenize').tokenize;
exports.ngram = require('./src/methods/tokenization/ngram').ngram;

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
exports.pos = require('./src/pos').pos;

//named_entity_recognition
exports.spot = require('./src/spot');

// exports.tests = require('./tests/test');

// console.log(exports.pos("the chimmney was really tall"))
// console.log(exports.spot("the chimmney was really tall"))
// exports.tests()
// console.log(exports.noun('hose'))