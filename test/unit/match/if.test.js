var test = require('tape');
var nlp = require('../lib/nlp');

test('if-basic:', function(t) {
  var r = nlp('spencer is here');
  var m = r.if('asdf');
  t.equal(m.out('text'), '', 'if-negative');

  m = r.if('spencer');
  t.equal(m.out('text'), 'spencer is here', 'if-positive');

  r = nlp('spencer is here. john was here.');
  m = r.if('is');
  t.equal(m.out('normal'), 'spencer is here.', 'if-partial');

  t.end();
});

test('ifNo:', function(t) {
  var r = nlp('spencer is here');
  //ifNo
  var m = r.ifNo('spencer');
  t.equal(m.out('text'), '', 'ifNo-positive');

  m = r.ifNo('asdf');
  t.equal(m.out('text'), 'spencer is here', 'ifNo-negative');

  r = nlp('spencer is here. john was here.');
  m = r.ifNo('is');
  t.equal(m.out('normal'), 'john was here.', 'if-no-partial');

  t.end();
});
