'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var lexicon = {
  dorritos: 'chip'
};
var r = nlp('blend 2 tbsp of dorritos', lexicon);
r.match('#Value #Unit of #chip').debug();
console.log('hi');
