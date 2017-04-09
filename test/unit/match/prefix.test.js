var test = require('tape');
var nlp = require('../lib/nlp');

test('prefix/infix/suffix basic', function(t) {
  let r = nlp('it is funny and weird');
  let m = r.match('-nny', true);
  t.equal(m.out('normal'), 'funny', 'suffix-match');
  m = r.match('fu-', true);
  t.equal(m.out('normal'), 'funny', 'prefix-match');
  m = r.match('-nn-', true);
  t.equal(m.out('normal'), 'funny', 'infix-match');

  m = r.match('-ff', true);
  t.equal(m.out('normal'), '', 'no-false-suffix');
  m = r.match('ff-', true);
  t.equal(m.out('normal'), '', 'no-false-prefix');
  m = r.match('-ff-', true);
  t.equal(m.out('normal'), '', 'no-false-infix');

  m = r.match('-', true);
  t.equal(m.out('normal'), '', 'no-throw1');
  m = r.match(' - ', true);
  t.equal(m.out('normal'), '', 'no-throw2');
  m = r.match(' -- ', true);
  t.equal(m.out('normal'), '', 'no-throw3');
  m = r.match(' - - ', true);
  t.equal(m.out('normal'), '', 'no-throw4');

  t.end();
});
