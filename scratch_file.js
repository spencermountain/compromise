'use strict';
//use this file for messing around.
//... it is not included in the build
console.log('\n\n\n\n');

const nlp = require('./src/index');
const log = require('./src/log');
const Term = require('./src/term/term');

let context = {
  debug: true
};
// let r = nlp('I will bust-out', context) //.to('Exclamation')
// log.show(r, '')
console.log(new Term('peace').tag('Noun').info('hasPlural'));
// console.log(t.to.fun().fun2())
// t.text = 'Fun'
// console.log(t.normal)
