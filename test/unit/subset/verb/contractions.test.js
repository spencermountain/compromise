var test = require('tape');
var nlp = require('../../lib/nlp');

test('conjugate-contractions:', function(t) {
  [
    [`i'm good`, 'i was good'],
    [`we've said`, 'we have said'],
    [`they're good`, 'they were good'],
    [`they'd said`, 'they had said'],
  // [`he's good`, 'he was good'],
  ].forEach(function(a) {
    var doc = nlp(a[0]);
    doc.verbs().toPastTense();
    t.equal(doc.out(), a[1], a[1]);
  });
  t.end();
});
