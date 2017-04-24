var test = require('tape');
var nlp = require('../lib/nlp');

test('prefix/infix/suffix basic', function(t) {
  var r = nlp('it is funny and weird');
  var m = r.match('_nny', true);
  t.equal(m.out('normal'), 'funny', 'suffix-match');
  m = r.match('fu_', true);
  t.equal(m.out('normal'), 'funny', 'prefix_match');
  m = r.match('_nn_', true);
  t.equal(m.out('normal'), 'funny', 'infix-match');

  m = r.match('_ff', true);
  t.equal(m.out('normal'), '', 'no-false-suffix');
  m = r.match('ff_', true);
  t.equal(m.out('normal'), '', 'no-false-prefix');
  m = r.match('_ff_', true);
  t.equal(m.out('normal'), '', 'no-false-infix');

  m = r.match('_', true);
  t.equal(m.out('normal'), '', 'no-throw1');
  m = r.match(' _ ', true);
  t.equal(m.out('normal'), '', 'no-throw2');
  m = r.match(' __ ', true);
  t.equal(m.out('normal'), '', 'no-throw3');
  m = r.match(' _ _ ', true);
  t.equal(m.out('normal'), '', 'no-throw4');

  m = r.match('w_', true);
  t.equal(m.out('normal'), 'weird', 'one-char-one-word');
  m = r.match('_r_', true);
  t.equal(m.out('normal'), 'weird', 'one-char-one-word2');
  m = r.match('_y', true);
  t.equal(m.out('normal'), 'funny', 'one-char-one-word3');

  t.end();
});
