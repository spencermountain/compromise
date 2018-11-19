var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`hello spencer, kelly is very cool. John and smith`);
// doc.debug();
// doc.not('#Noun').debug();
doc.nouns().debug();
