'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var doc = nlp('Karagandy Region, Foo Province, State of Kjllekd, West Ldjec');
// doc.places().debug();

var doc = nlp('cool cool cool cool cool');
// doc.match('cool{1,3}').debug();

doc = nlp('nice, cool');
console.log(doc.list[0].terms[0]);
