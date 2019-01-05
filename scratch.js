var nlp = require('./src/index');
nlp.verbose('tagger');

// nlp(`Jack talked for his achievement`).debug();
// nlp(`Jack cheered`).debug();
nlp(`Jack is guarded`).debug();
