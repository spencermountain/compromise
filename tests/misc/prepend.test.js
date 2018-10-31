var test = require('tape');
var nlp = require('../lib/nlp');

test('prepend parent', function(t) {
  let doc = nlp(`one two four five`);
  doc.match('four').prepend('[three]');
  t.equal(doc.text(), 'one two [three] four five', 'prepended in parent');
  t.end();
});
