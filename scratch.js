var nlp = require('./src/index');
// nlp.verbose('tagger');

// let doc = nlp('My (teacher said) to (him) and that was good').parentheses().debug();
let doc = nlp('born in Canada (Toronto), Drake (Aubrey Graham) became a hit (a success)').parentheses().debug();
