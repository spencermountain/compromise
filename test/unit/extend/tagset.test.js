var test = require('tape');
var nlp = require('../lib/nlp');

test('extend-tagset-flat', function(t) {
  var tagSet = {
    Color: {}
  };
  var lexicon = {
    'mother of pearl': 'Color'
  };
  nlp.addTags(tagSet);
  var m = nlp('it is mother of pearl', lexicon).match('#Color+');
  t.equal(m.out('normal'), 'mother of pearl', 'text found');
  t.ok(m.has('#Noun'), 'it does not get in the way of the tagger');
  t.end();
});

test('extend-tagset-nested', function(t) {
  var tagSet = {
    Color: {},
    OffWhite: {
      isA: 'Color'
    },
  };
  nlp.addTags(tagSet);
  var lexicon = {
    'mother of pearl': 'OffWhite'
  };
  var m = nlp('it is mother of pearl', lexicon).match('#OffWhite');
  t.equal(m.out('normal'), 'mother of pearl', 'text found');
  t.ok(m.has('#Noun'), 'it does not get in the way of the tagger');
  t.ok(m.has('#Color'), 'has isA tag, too');
  t.end();
});
