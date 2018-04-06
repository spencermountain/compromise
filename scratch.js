var nlp = require('./src/index');
// nlp.verbose('tagger');

// console.log(nlp('i am cool').sentences().toPresentTense().out());

let plugin = {
  regex: {
    '$paleo[a-z]{4}': 'Noun',
    'iraptor': 'Dinosaur',
  }
};
nlp.plugin(plugin);
nlp('a velociraptor').debug();
