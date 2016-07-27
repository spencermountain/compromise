'use strict';
//use this file for messing around.
//... it is not included in the build
// console.log('\n\n\n\n');

const nlp = require('./src/index');
const tags = require('./src/tagset');
const log = require('./src/log');
const Term = require('./src/term/term');

log.disable();

// nlp('  john f.   kennedy  ').render('prettyPrint');
// nlp('6 am').render('prettyPrint');
// nlp('3$8').render('prettyPrint');
console.log(nlp('i think he will have not step up').info('terms')[6].info('components'));
// let r = nlp('He will walk. Is John cool? It said so.')
// r.render('pretty')
// console.log(r.if('Noun').is('Person'))
// console.log(r.if('Verb').to('Normal').render('text'))
// console.log(r.render('text'))
// console.log(t.info('after').map((t) => t.normal));
// nlp('the united kingdom is really nice.').render('prettyPrint');
// nlp('he said i\'m very nice').render('prettyPrint');
// nlp('i dunno about').to('titleCase').render('prettyPrint');
// console.log(nlp('hello. <script>alert(\'hji\')</script> so<br/> yeah').render('html'));
// console.log(t.is('Singular'));

// console.log(nlp('apples').sentences[0].terms[0].info('Conjugations'));
