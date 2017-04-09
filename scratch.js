// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('-2').values().data());

let r = nlp('hi hi hi one two three four five');
r.match('one two{1,3}').debug();
