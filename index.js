// nlp_comprimise by @spencermountain  in 2014
// most files are self-contained modules that optionally export for nodejs
// this file loads them all together
// if we're server-side, grab files, otherwise assume they're prepended already
// console.time('nlp_boot')

var parents = require("./src/parents/parents")

var sentence_parser = require('./src/methods/tokenization/sentence');
var tokenize = require('./src/methods/tokenization/tokenize');
var ngram = require('./src/methods/tokenization/ngram');

//tokenize
var normalize = require('./src/methods/transliteration/unicode_normalisation')
var syllables = require('./src/methods/syllables/syllable');

//localization
var americanize = require('./src/methods/localization/americanize')
var britishize = require('./src/methods/localization/britishize')

//part of speech tagging
var pos = require('./src/pos');

//named_entity_recognition
var spot = require('./src/spot');

///
// define the api
var nlp = {
  noun: parents.noun,
  adjective: parents.adjective,
  verb: parents.verb,
  adverb: parents.adverb,
  value: parents.value,

  sentences: sentence_parser,
  ngram: ngram,
  tokenize: tokenize,
  americanize: americanize,
  britishize: britishize,
  syllables: syllables,
  normalize: normalize.normalize,
  denormalize: normalize.denormalize,
  pos: pos,
  spot: spot
}

//export it for client-side
if (typeof window!=="undefined") { //is this right?
  window.nlp = nlp
}

//export it for server-side
module.exports = nlp;

// console.timeEnd('nlp_boot')
// console.log( nlp.pos('she sells seashells by the seashore').sentences[0].negate().text() )
// console.log( nlp.pos('i will slouch'));
// console.log( nlp.pos('Sally Davidson sells seashells by the seashore. Joe Biden said so.').people() )
// console.log(nlp.pos("Tony Danza is great. He works in the bank.").sentences[1].tokens[0].analysis.reference_to())
// console.log(nlp.pos("the FBI was hacked. He took their drugs.").sentences[1].tokens[2].analysis.reference_to())
