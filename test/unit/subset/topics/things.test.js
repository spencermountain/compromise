var test = require('tape');
var nlp = require('../../lib/nlp');

test('topics concat:', function(t) {
  var things = nlp('spencer and danny are in Paris France, and germany for Google Inc and IBM').topics().out('array');
  var want = ['spencer', 'danny', 'paris france', 'germany', 'google inc', 'ibm'];
  t.equal(things.join(', '), want.join(', '), 'found right things');
  t.end();
});
