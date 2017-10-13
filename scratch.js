var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();
// var plugin = {
//   regex: {
//     uuu: 'Exaggeration'
//   }
// };
// nlp.plugin(plugin);
let doc = nlp('1999-12-31 to tomorrow');
doc.debug();
