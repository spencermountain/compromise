var nlp = require('./src/index');
nlp.verbose('tagger');
// var myWords = {
//   'university of toronto': 'Organization',
//   'girble': 'CuteThing'
// };
// var r = nlp('he studied girbles at the University-of-Toronto', myWords);
// r.debug();
// var doc = nlp('girble').nouns().toPlural().debug();
// doc.debug();

let doc = nlp('jean jacket. jean Slkje');
doc.debug();
