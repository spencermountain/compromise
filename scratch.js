'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');
nlp.addRegex({
  aaa: 'Exaggeration'
});
let doc = nlp('it is waaaay cool');
doc.debug();
