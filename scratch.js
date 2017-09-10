'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
let plugin = {
  plurals: {
    mouse: 'mousii'
  }
};
nlp.plugin(plugin);
let doc = nlp('saw a mouse');
doc.nouns().toPlural();
doc.debug();
