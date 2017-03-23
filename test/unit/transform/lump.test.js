var test = require('tape');
var nlp = require('../lib/nlp');

test('lumper:', function (t) {
  var str = 'we live in Toronto Canada and it is cold.';
  var r = nlp(str);
  t.equal(r.wordCount(), 9, '9 words start');

  r.match('#Place+').lump();
  t.equal(r.out('text'), str, 'output unchanged');
  t.equal(r.wordCount(), 8, '8 words now');

  let term = r.list[0].terms[3];
  t.ok(term.tag.Country, 'has-country-tag');
  t.ok(term.tag.City, 'has-city-tag');
  t.ok(term.tag.Noun, 'has-shared-noun-tag');
  t.end();
});
