var test = require('tape');
var nlp = require('../lib/nlp');

test('tagset-change-isA-basic', function(t) {
  nlp.addTags({
    Doctor: {
      isA: 'Person'
    }
  });
  nlp.addWords({
    surgeon: 'Doctor',
    'surgeon general': 'Doctor'
  });
  var doc = nlp('the surgeon operated');

  //basic isA
  t.equal(doc.match('#Doctor').out('normal'), 'surgeon', 'surgeon is a doctor');
  t.equal(doc.people().length, 1, 'doctor is a person');

  doc = nlp('lkjsdf').tag('#Person');
  t.equal(doc.match('#Doctor').length, 0, 'person isnt a doctor, necessarily');

  doc = nlp('lkjsdf').tag('#Doctor');
  t.equal(doc.match('#Person').length, 1, 'post-hoc tags work, too');

  //multi-word
  doc = nlp('the surgeon general operated');
  t.equal(doc.match('#Doctor').out('normal'), 'surgeon general', 'multi-word');
  t.equal(doc.match('#Person').out('normal'), 'surgeon general', 'multi-word-isA');
  t.end();
});

test('tagset-change-isA', function(t) {
  nlp.addTags({
    Doctor: {
      isA: 'Person',
      notA: ['Foo']
    }
  });
  nlp.addWords({
    lkjj: 'Foo'
  });
  var doc = nlp('he is lkjj');
  t.equal(doc.match('#Foo').out('normal'), 'lkjj', 'init-there');
  doc.match('lkjj').tag('#Doctor');

  t.equal(doc.match('#Doctor').out('normal'), 'lkjj', 'doctor-tag-there');
  t.equal(doc.match('#Foo').out('normal'), '', 'foo-is-gone');

  t.end();
});

test('tagset-remove-downward', function(t) {
  nlp.addTags({
    Doctor: {
      isA: 'Person'
    },
    Surgeon: {
      isA: 'Doctor'
    }
  });
  var doc = nlp('george is a person.');
  doc.match('george').tag('Surgeon');

  t.ok(doc.has('#Surgeon'), 'Surgeon-tag-there');
  t.ok(doc.has('#Doctor'), 'doctor-tag-there');
  t.ok(doc.has('#Person'), 'person-tag-there');

  //remove one in the middle..
  doc.match('george').unTag('Person');
  t.ok(doc.has('#Person') === false, 'person-tag-gone');
  t.ok(doc.has('#Doctor') === false, 'doctor-tag-gone');
  t.ok(doc.has('#Surgeon') === false, 'Surgeon-tag-gone');
  t.end();
});

test('tagset-remove-half-downward', function(t) {
  nlp.addTags({
    Doctor: {
      isA: 'Person'
    },
    Surgeon: {
      isA: 'Doctor'
    }
  });
  var doc = nlp('george is a person.');
  doc.match('george').tag('Surgeon');

  //remove one just under the top..
  doc.match('george').unTag('Doctor');
  t.ok(doc.has('#Person') === true, 'person-tag-there');
  t.ok(doc.has('#Doctor') === false, 'doctor-tag-gone');
  t.ok(doc.has('#Surgeon') === false, 'Surgeon-tag-gone');
  t.end();
});
