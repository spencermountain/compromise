var nlp = require('./src/index');
// nlp.verbose('tagger');

var doc = nlp('hello. 1234. ëėö.');

doc.debug();
// console.log(doc.terms().data());
