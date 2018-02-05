var nlp = require('./src/index');
// nlp.verbose('tagger');

// var myWords = {
//   'university of toronto': 'Organization',
//   'girble': 'CuteThing'
// };
// var r = nlp('he studied girbles at the University-of-Toronto', myWords);
// r.debug();
// var doc = nlp('girble').nouns().toPlural().debug();
// doc.debug();
// configure
// enforce
// implement
// pin
// reset
let doc = nlp('configure. enforce. implement. would pin. reset.');
// let doc = nlp('pin. reset.');
doc.debug();
