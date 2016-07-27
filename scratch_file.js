'use strict';
//use this file for messing around.
//... it is not included in the build
// console.log('\n\n\n\n');

const nlp = require('./src/index');
const tags = require('./src/tagset');
const log = require('./src/log');
const Term = require('./src/term/term');

// log.disable();

// nlp('  john f.   kennedy  ').render('prettyPrint');
// nlp('6 am').render('prettyPrint');
// nlp('3$8').render('prettyPrint');
nlp('the united kingdom is really nice.').render('prettyPrint');
// nlp('he said i\'m very nice').render('prettyPrint');
// nlp('i dunno about').to('titleCase').render('prettyPrint');
// console.log(nlp('hello. <script>alert(\'hji\')</script> so<br/> yeah').render('html'));
// console.log(t.is('Singular'));

// console.log(nlp('apples').sentences[0].terms[0].info('Conjugations'));
