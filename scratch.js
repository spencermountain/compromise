var nlp = require('./src/index');
nlp.verbose('tagger');


// nlp('hungry brown bear').debug();
nlp('Alice was eaten by a bear.').debug();
