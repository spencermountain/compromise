var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`one two three four.`);
console.log(doc.found);
console.log(doc.match('asdf').found);
