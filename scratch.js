var nlp = require('./src/index');
nlp.verbose('tagger');


// nlp('hungry brown bear').debug();
let doc = nlp(`It doesn't matter`);
doc.normalize({
  contractions: false
});
console.log(doc.text());
