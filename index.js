// ties the files together for server-side use
// the gruntfile concatenates them for client-side
var nlp = {}

var parents = require("./src/parents/parents")
Object.keys(parents).forEach(function(k) {
	nlp[k] = parents[k]
})


//other methods
////////////

// tokenization
nlp.sentences = require('./src/methods/tokenization/sentence').sentences;
nlp.tokenize = require('./src/methods/tokenization/tokenize').tokenize;
nlp.ngram = require('./src/methods/tokenization/ngram').ngram;

//tranliteration
var l = require('./src/methods/transliteration/unicode_normalisation')
nlp.normalize = l.normalize
nlp.denormalize = l.denormalize

//syllable splitting (hyphenization)
nlp.syllables = require('./src/methods/syllables/syllable');

//localization
var l = require('./src/methods/localization/britishize')
nlp.americanize = l.americanize;
nlp.britishize = l.britishize;

//part of speech tagging
nlp.pos = require('./src/pos');

//named_entity_recognition
nlp.spot = require('./src/spot');

// nlp.tests = require('./tests/test');

// console.log(nlp.pos("the chimmney was really tall"))
// console.log(nlp.spot("the chimmney was really tall"))
// nlp.tests()
// console.log(nlp.noun('hose'))
module.exports = nlp
// console.log(nlp.noun('chair'))
// console.log(nlp.verb('walk').conjugate())