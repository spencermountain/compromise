var test = require('tape');
var nlp = require('../lib/nlp');

test('tag-multiples:', function(t) {
  var r = nlp('twas brillig in the doofgafoof.');
  r.match('brillig').tag(['Foo', 'Barr']);
  t.ok(r.match('#Foo').found, 'tagged-foo');
  t.ok(r.match('#barr').found, 'tagged-barr');
  t.end();
});
