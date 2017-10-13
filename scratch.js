var nlp = require('./src/index');
// nlp.verbose('tagger');

nlp.addTags({
  Doctor: {
    isA: 'Person'
  },
  Surgeon: {
    isA: 'Doctor'
  }
});
var doc = nlp('george');
doc.tag('Surgeon');
doc.unTag('Doctor');
console.log(doc.has('#Surgeon'));
doc.debug();
