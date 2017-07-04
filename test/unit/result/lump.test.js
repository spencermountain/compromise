var test = require('tape');
var nlp = require('../lib/nlp');

test('lumper:', function(t) {
  var str = 'we live in Toronto Canada and it is cold.';
  var r = nlp(str);
  t.equal(r.wordCount(), 9, '9 words start');

  r.match('#Place+').lump();
  t.equal(r.out('text'), str, 'output unchanged');
  t.equal(r.wordCount(), 8, '8 words now');

  var term = r.list[0].terms[3];
  t.ok(term.tags.Country, 'has-country-tag');
  t.ok(term.tags.City, 'has-city-tag');
  t.ok(term.tags.Noun, 'has-shared-noun-tag');
  t.end();
});

test('lumper-multiple-matches:', function(t) {
  var str = 'imagine if Patrick Watson and Emma Stone got married';
  var r = nlp(str);
  t.equal(r.wordCount(), 9, '9 words start');

  r.match('#Person+').lump();
  t.equal(r.out('text'), str, 'output unchanged');
  t.equal(r.wordCount(), 7, '7 words now');

  var term = r.list[0].terms[2];
  t.ok(term.tags.FirstName, 'has-firstname-tag');
  t.ok(term.tags.Person, 'has-person-tag');

  term = r.list[0].terms[4];
  t.ok(term.tags.FirstName, 'has-firstname-tag2');
  t.ok(term.tags.Person, 'has-person-tag2');
  t.end();
});

test('lumper-long:', function(t) {
  var str = 'I think Sir Patrick James Watson is cool';
  var r = nlp(str);
  t.equal(r.wordCount(), 8, '8 words start');

  r.match('#Person+').lump();
  t.equal(r.out('text'), str, 'output unchanged');
  t.equal(r.wordCount(), 5, '5 words now');

  var term = r.list[0].terms[2];
  t.ok(term.tags.FirstName, 'has-firstname-tag');
  t.ok(term.tags.Person, 'has-person-tag');

  t.end();
});
