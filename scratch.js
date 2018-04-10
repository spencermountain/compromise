var nlp = require('./src/index');
// nlp.verbose('tagger');


// nlp('the united states senate').match('the (canadian|united states)').debug();
// nlp('really pretty cool').debug(); //.match('#Copula [(just|alone)$]').debug();
// nlp('i am pretty confused').debug();

// nlp('the united states congress').match('the (united states|canada) .');
// nlp('is it fun').questions().debug();

nlp('the canadian senate').match('the (canadian|united states|british) senate').debug();
