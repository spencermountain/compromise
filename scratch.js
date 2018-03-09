var nlp = require('./src/index');
nlp.verbose('tagger');


// nlp('zeroth').values().toNumber().debug(); // 40 8
nlp('ninety nine').values().toNumber().debug(); // 40 8
// nlp('sixty eight').values().toNumber().debug(); // 40 8
