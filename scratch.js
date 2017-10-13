var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();
// var plugin = {
//   words: {
//     'mt john': 'Mountain'
//   }
// };
// nlp.plugin(plugin);
let doc = nlp('zero').tag('Noun').nouns().toPlural();
// console.log(doc.world().words.aircraft);
doc.debug();
