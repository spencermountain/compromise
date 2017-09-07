'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

let doc = nlp('it is waaaay cool');
doc.match('/aaa/').debug();
