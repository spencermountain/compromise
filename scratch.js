var nlp = require('./src/index');
// nlp.verbose('tagger');


nlp('twenty-three septillion').values().toText().debug(); // 40 8
