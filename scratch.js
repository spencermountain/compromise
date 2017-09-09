'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
let plurals = {
  mather: 'mathii',
  algebra: 'algebri'
};
nlp.addPlurals(plurals);
let doc = nlp('the mather did many algebri');
doc.nouns().toPlural();
doc.nouns().toSingular();
doc.debug();
