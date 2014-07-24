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

nlp.word= function(str, options){
  return nlp.pos(str, options)[0].tokens[0]
}

// nlp.tests = require('./tests/test');

// console.log(nlp.pos("the chimmney was really tall"))
// console.log(nlp.spot("the chimmney was really tall"))
// nlp.tests()
// console.log(nlp.noun('hose').article())
module.exports = nlp
// n = nlp.noun('fun').conjugate()
// console.log(n)
// console.log(nlp.noun('chair').pluralize())
// console.log(nlp.adjective("quick").conjugate())
// console.log(nlp.adverb("quickly").conjugate())

// console.log(nlp.verb('walk').conjugate())
// console.log(nlp.noun("wolf").article() == "a")

// console.log(nlp.adjective("ferocious").conjugate().noun)
// console.log(nlp.noun('children').singularize() == 'child')

// console.log(nlp.adverb('truly').conjugate().adjective)
// console.log(nlp.adverb.to_adjective('gently') == 'gent')
// console.log(nlp.adjective('naive').conjugate().adverb == 'naively')

// tags= nlp.pos('Tony Hawk said he was very happy')[0].tokens
// console.log(tags)
// console.log(tags.filter(function(t){return t.pos.parent=="noun" && t.analysis.is_entity}))
// console.log(nlp.pos("it was sturdy")[0].tokens)
// console.log(new Adjective("sacred").conjugate())
// console.log(nlp.word('went').pos)