var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`one two three four`);
doc.match('one').prepend('zero'); //.debug();
doc.debug();
