var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();

var lexicon = {
  'mt washington': 'Mountain'
};
let doc = nlp('he walked to mt washington', lexicon).debug();
// console.log(doc.world().words['mt washington']);
// console.log(doc.world().cache.firstWords['mt']);
