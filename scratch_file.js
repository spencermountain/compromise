'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

//unlump 2.
// nlp(`Kobe Bryant`).check();

nlp(`the Bank of America in the hall`, {
  'bank of america': 'Organization'
}).topics().check();
