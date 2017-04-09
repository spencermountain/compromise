// 'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('-2').values().data());

let r = nlp('one two three four five six seven');
console.log(r.match('one .{0,3} two', true).out('array'));
