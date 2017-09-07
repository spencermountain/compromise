var test = require('tape');
var nlp = require('../lib/nlp');

test('tagset-change', function(t) {
  nlp.addTags({
    Doctor: {
      isA: 'Person',
      notA: ['Verb']
    }
  });
  nlp.addWords({ surgeon: 'Doctor', 'surgeon general': 'Doctor' });
  var doc = nlp('the surgeon operated');

  t.equal(doc.match('#Doctor').out('normal'), 'surgeon', 'surgeon is a doctor');
  t.equal(doc.people().length, 1, 'doctor is a person');

  doc = nlp('lkjsdf').tag('#Person');
  t.equal(doc.match('#Doctor').length, 0, 'person isnt a doctor, necessarily');

  doc = nlp('lkjsdf').tag('#Doctor');
  t.equal(doc.match('#Person').length, 1, 'post-hoc tags work, too');
  t.end();
});
