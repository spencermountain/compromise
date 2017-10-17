var test = require('tape');
var nlp = require('../lib/nlp');

test('basic-plugin', function(t) {
  var plugin = {
    words: {
      trex: 'Dinosaur'
    },
    tags: {
      Dinosaur: {
        isA: 'Animal'
      },
      Animal: {
        isA: 'Noun'
      }
    },
    regex: {
      uuu: 'Exaggeration'
    }
  };
  nlp.plugin(plugin);
  var doc = nlp('i saw a HUUUUGE trex');

  t.equal(doc.match('#Exaggeration').out('normal'), 'huuuuge', 'regex-works');
  t.equal(doc.match('#Dinosaur').out('normal'), 'trex', 'lexicon-works');
  t.equal(doc.match('#Animal').out('normal'), 'trex', 'tagset-works');

  t.end();
});
