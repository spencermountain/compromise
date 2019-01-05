var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp(`Jack talked for his achievement`).debug();
// nlp(`Jack cheered for his achievement`).debug();
// nlp(`Jack guarded for his achievement`).debug();

// let doc = nlp(`we released, "Square Up".`);
// console.log(doc.map(obj => obj.text()));

let doc = nlp('then you said ... ?');
// console.log(doc.list[0].terms[2]);
console.log(doc.questions().length);
// console.log(doc.terms().map((q) => q.text()));
