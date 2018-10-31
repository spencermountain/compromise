var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(`one two four five`);
doc.match('four').prepend('[three]').debug();
console.log('--');
doc.debug();

console.log(doc.out());
// let doc = nlp(`i don't care`);
// doc.debug();
