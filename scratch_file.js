'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();
// var m = nlp('4:00');
// m.values().toNumber();
// $56.04
// m.check();
// m.values().toNiceNumber();

// var dates = r.dates().parse();
// console.log(dates[0]);

// var r = nlp('six years before january 5th 1992');
// console.log(r.match('#Value #Duration').values().plaintext());
// console.log(r.match('#Value #Duration').values().toNumber().plaintext());

// console.log(nlp('it is 55').values().toOrdinal().plaintext());

let m = nlp('played'); //.tag('Verb');
// console.log(m.verbs().conjugate(true));
// m.values().toTextValue(); //.check();
m.check();
