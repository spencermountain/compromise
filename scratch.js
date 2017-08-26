'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger')
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('i take typically the stairs').verbs().conjugate())

// console.log(nlp('took').verbs().conjugate())
// let doc = nlp("EfD's")
// let doc = nlp('The Elkjsdflkjsdf sells hamburgers')
// let doc = nlp('The EACD united in 1972. EACD must follow regulations.')
// doc.debug()
// doc.topics().debug()

var getNumbers = function(str) {
  return nlp(str).debug().values().out('array'); //.toCardinal().toNumber()
};

// var doc = nlp('two thousand and nineteenth').values() //.toText()
//
// doc.debug()
// doc.toNumber().debug()
// console.log(getNumbers('first second and 4th')) // => [null, 4]
// console.log(getNumbers('two hundredth')) // => [null, 4]
// console.log(getNumbers('first , second and 4th')) // => [1, 2, 4]
// console.log(getNumbers('1 2 and 4')) // => [2, 4]
// console.log(getNumbers('1 and 2 and 4')) // => [1, 2, 4]

// var doc = nlp(`the IOU i have`);
// var doc = nlp('giri were');
// var doc = nlp("he's got time")
// var doc = nlp('is it nice in chicago');
var doc = nlp('lkjsdf fun!?');
// doc.statements().debug();
doc.questions().debug();
// doc.debug();
// console.log(doc);
// doc.contractions().expand()
// console.log(doc.out())
