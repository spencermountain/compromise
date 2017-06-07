'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// var r = nlp('And you are?. Marshal');
// r.sentences(); //.out();
// r.debug();

// var r2 = nlp(`- where is she.Oh.  you guys don't know?`).normalize().sentences().out();
// r2.debug();

var doc = nlp('are?.').not('are?');
doc.debug();
