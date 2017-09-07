var test = require('tape');
var nlp = require('../lib/nlp');

test('regex-match:', function(t) {
  var doc = nlp('it is waaaay cool');
  var m = doc.match('/aaa/');
  t.equal(m.out('normal'), 'waaaay', 'basic-match');

  m = doc.match('/[ao]{2}/');
  t.equal(m.out('array').length, 2, 'trickier-match');

  m = doc.match('is /aaam?/ .');
  t.equal(m.out('normal'), 'is waaaay cool', 'trickier-match');

  m = doc.match('#Copula /a+/ /ool$/');
  t.equal(m.out('normal'), 'is waaaay cool', 'even-trickier-match');

  t.end();
});
