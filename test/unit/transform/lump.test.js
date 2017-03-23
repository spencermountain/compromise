var test = require('tape');
var nlp = require('../lib/nlp');

test('lumper:', function (t) {
  var str = 'we live in Toronto Canada and it is cold.';
  var r = nlp(str);
  t.equal(r.wordCount(), 9, '9 words start');

  r.match('#Place+').lump();
  t.equal(r.out('text'), str, 'output unchanged');
  t.equal(r.wordCount(), 8, '8 words now');

  t.end();
});
