var nlp = require('./src/index');
// nlp.verbose('tagger');

const doc = nlp('I’m lookin’ for Amanda Hugginkiss');
const past = doc.sentences().toPastTense().out('text');
console.log(past);
