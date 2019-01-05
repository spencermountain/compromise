var nlp = require('./src/index');
nlp.verbose('tagger');

// nlp(`Jack talked for his achievement`).debug();
// nlp(`Jack cheered for his achievement`).debug();
// nlp(`Jack guarded for his achievement`).debug();

let doc = nlp(`a test string`);
doc.debug();
