var nlp = require('./src/index');
// nlp.verbose('tagger');

nlp('i went to the super bowl').tag('Verb').tag('Noun').debug();
