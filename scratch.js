'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var lexicon = {
  dorritos: 'Noun',
  ruffles: 'noun'
};
var r = nlp(' dorritos and ruffles', lexicon);
r.match('#Noun').debug();
r.match('#noun').debug();
