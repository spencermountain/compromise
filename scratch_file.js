'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

let all = nlp('he\'s really nice. is she going? he is nice.');
// all.contractions().check().expand()//.all().check();
// all.adverbs().remove();
all.filter((ts) => {
  return ts.endPunctuation() === '?';
}).check().all().check();
// nlp('spencer is nice. he is cool').match('spencer').all().check();

// var m = nlp('the dog sat').insertAfter('and');
// m.check()
