var nlp = require('./src/index');
// nlp.verbose('tagger');

nlp.addWords({
  'george harrison': 'Singer'
});
var doc = nlp('george harrison is a person.');
doc.debug();
