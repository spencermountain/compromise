'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');

var arr = nlp('one two three four five, one two three four five, one two three four five')
  .ngrams({ max: 5 })
  .data();
console.log(arr);
