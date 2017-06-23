'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var lexicon = {
  paris: 'Person',
  lkjj: 'Adjective',
  'donkey kong': 'City'
};
var doc = nlp('donkey kong wins the award in paris', lexicon);
doc.debug();
// console.log(nlp('friendly').adjectives().data());
