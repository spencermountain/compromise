'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

// var m = nlp('it is seven hundred and seventieth');
// var m = nlp('it is 7270th');
// m.values().toTextValue();
// m.values().toNumber();
// m.values().toCardinal();
// m.values().toOrdinal();
// m.values().toNiceNumber();
// m.check();
// console.log(m.values().parse()[0]);
// r.terms().check();
// console.log(r.values().toNumber().term(0).first().normal());
// console.log(r.list[0].terms[0].normal);

var m = nlp('it is ' + 332);
m.values().toTextValue().check();
// console.log(m.values().toTextValue().normal());
