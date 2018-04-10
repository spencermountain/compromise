var nlp = require('./src/index');
// nlp.verbose('tagger');


// nlp('the united states senate').match('the (canadian|united states)').debug();
// nlp('really pretty cool').debug(); //.match('#Copula [(just|alone)$]').debug();
// nlp('i am pretty confused').debug();

// nlp('the united states congress').match('the (united states|canada) .');
// nlp('is it fun').questions().debug();

// console.log(nlp('the cool, version of a fun canadian senate').match('#Adjective').setPunctuation('?').debug().getPunctuation());

console.log(nlp('profit of N.V.,').debug().out('terms'));

/*


N.V.,
$37-a-share
``closed-end
John & John

16.125
his spending
PC
PCs.
AIDS
$19
his fine
japanese art
butterfly
her - Pronoun?
broken
inched
blamed
endless mudslinging
girlfriend
*/
