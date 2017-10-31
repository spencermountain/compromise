var test = require('tape');
var nlp = require('../../lib/nlp');

test('conjugate-contractions:', function(t) {
  [
    [`i'm good`, 'i was good'],
    [`they're good`, 'they were good'],
  //TODO: missing auxillary
  // [`we've said`, 'we said'], //or 'we have said'
  // [`they'd said`, 'they said'], //or 'they have said'
  // (ambiguous)
  // [`he's good`, 'he was good'],
  ].forEach(function(a) {
    var doc = nlp(a[0]);
    doc.verbs().toPastTense();
    t.equal(doc.out(), a[1], a[1]);
  });
  t.end();
});
