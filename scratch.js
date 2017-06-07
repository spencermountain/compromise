'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var doc = nlp('the 23rd of December');
doc.values().add(2).toText();
console.log(doc.out('text'));
// 'the twenty fifth of December'
