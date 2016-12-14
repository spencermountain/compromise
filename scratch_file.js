'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

var m = nlp('-2'); //.delete('brown');
// var r = nlp('is cool-enough for john').adjectives(); //.dates().toLongForm();
// var r = nlp('5 six-ounce containers'); //.dates().toLongForm();
// var r = nlp('two thousand five hundred and sixty'); //.dates().toLongForm();
m.check();
// console.log(r.parse());
// r.terms().check();
// console.log(r.values().toNumber().term(0).first().normal());
// console.log(r.list[0].terms[0].normal);
