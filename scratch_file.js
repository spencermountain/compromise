'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

// const m = nlp('john would not have had been walking');
// console.log(m.verbs().check().data());
// var arr = nlp('john would be walking').check().verbs().data();
// console.log(arr);

nlp('is walking').match('is (#Adverb|not)+? walking').check();
