var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`hello spencer & kelly is very cool ;). John and smith too?`);
doc.debug();
// doc.not('#Noun').debug();
// doc.questions().debug();
