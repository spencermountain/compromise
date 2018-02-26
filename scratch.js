var nlp = require('./src/index');
// nlp.verbose('tagger');


// Try splitting the string into quoted strings.
nlp('My "String" "with many" adjacent "nested" \'quotes\'').quotations().debug();
