var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`before james middle then james after`);
// doc.nouns().debug();
doc.splitOn('james').debug();
