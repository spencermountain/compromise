'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
let conjugations = {
  woo: {
    PastTense: 'wood'
  }
};
nlp.addConjugations(conjugations);
let doc = nlp('woo the crush');
doc.verbs().toPastTense();
doc.debug();
