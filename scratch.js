var nlp = require('./src/index');
nlp.verbose(true);

let doc = nlp(`one two three four.`);
doc.match('two').append('and a').debug();
doc.debug();
