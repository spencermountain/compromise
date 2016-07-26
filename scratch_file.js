'use strict';
//use this file for messing around.
//... it is not included in the build
console.log('\n\n\n\n');

const nlp = require('./src/index');
const tags = require('./src/tagset');
const log = require('./src/log');
const Term = require('./src/term/term');

log.disable();

// nlp('  john f.   kennedy  ').as('printTags');
// nlp('6 am').as('printTags');
// nlp('3$8').as('printTags');
// nlp('united kingdom').as('printTags');
// nlp('he said i\'m very nice').as('printTags');
// nlp('i dunno about').to('titleCase').render('prettyPrint');
// console.log(nlp('hello. <script>alert(\'hji\')</script> so<br/> yeah').render('html'));
// console.log(t.is('Singular'));


console.log(nlp('don').sentences[0].terms[0].pos);
