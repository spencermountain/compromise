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

var plugin = {
  tags: {
    Character: {
      isA: 'Noun'
    }
  },
  words: {
    itchy: 'Character',
    scratchy: 'Character',
  }
};
nlp.plugin(plugin);
nlp(`Couldn't Itchy share his pie with Scratchy?`).debug();
