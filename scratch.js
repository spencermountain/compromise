var nlp = require('./src/index');
// nlp.verbose('tagger');

nlp('My "String" "with many" adjacent "nested" \'quotes\'').quotations().debug();
