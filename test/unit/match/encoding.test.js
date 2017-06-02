var test = require('tape');
var nlp = require('../lib/nlp');

test('encoding-match:', function(t) {

  var r = nlp('it is * nice');
  var str = r.match('is \\*').trim().out();
  t.equal(str, 'is *', 'encode asterix');

  // r = nlp('it is + nice');
  // str = r.match('is \\+ nice').trim().out();
  // t.equal(str, 'is + nice', 'encode plus');

  t.end();
});

test('reserved-word-in-src:', function(t) {
  let r = nlp('buy eggs constructor yeah prototype');
  t.equal(r.has(`backburner`), false, 'single');
  t.equal(r.has(`#Foo`), false, 'tag');
  t.equal(r.has(`(upcoming|backburner)`), false, 'anyOf');
  t.equal(r.has(`lala+`), false, 'manyOf');
  t.equal(r.has(`nword{2,4}`), false, 'someOf');
  t.end();
});

test('reserved-word-in-match:', function(t) {
  r = nlp('fo foo fulala repeat');
  t.equal(r.has(`constructor`), false, 'single');
  t.equal(r.has(`#constructor`), false, 'tag');
  t.equal(r.has(`(upcoming|constructor)`), false, 'anyOf');
  t.equal(r.has(`constructor+`), false, 'manyOf');
  t.equal(r.has(`constructor{2,4}`), false, 'someOf');
  t.end();
});
