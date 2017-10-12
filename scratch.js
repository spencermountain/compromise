var nlp = require('./src/index');
// nlp.verbose('tagger');

// nlp.addWords({
//   'george steve walter harrison jr': 'Singer',
//   'george harrison': 'Singer'
// });
// var doc = nlp('george steve walter harrison jr is a person.');
// doc.debug();

nlp.addTags({
  Doctor: {
    isA: 'Person'
  }
});

let doc = nlp('lkj').tag('Doctor');
console.log(doc.world().tags.Person);
console.log(doc.world().tags.Doctor);
doc.debug();
