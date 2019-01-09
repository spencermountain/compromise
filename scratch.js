var nlp = require('./src/index');
nlp.verbose('tagger');

// nlp(`Jack talked for his achievement`).debug();
// nlp(`Jack cheered`).debug();
// nlp(`the SuperDot, was launched in 1984.`).debug();
// const doc = nlp('7 hours').debug();
// const doc = nlp('1 hours').debug();
const doc = nlp('1 hour').debug();
console.log(doc.values().data()[0]);
