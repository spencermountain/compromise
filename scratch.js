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

console.log(nlp('he will walk the street, frontyard').terms().data().map(t => t.bestTag));
