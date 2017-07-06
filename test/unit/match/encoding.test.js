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
  var r = nlp('buy eggs constructor yeah prototype');
  t.equal(r.has(`backburner`), false, 'single');
  t.equal(r.has(`#Foo`), false, 'tag');
  t.equal(r.has(`(upcoming|backburner)`), false, 'anyOf');
  t.equal(r.has(`lala+`), false, 'manyOf');
  t.equal(r.has(`nword{2,4}`), false, 'someOf');
  t.end();
});

test('reserved-word-in-match:', function(t) {
  var r = nlp('fo foo fulala repeat');
  t.equal(r.has(`constructor`), false, 'single');
  t.equal(r.has(`#constructor`), false, 'tag');
  t.equal(r.has(`(upcoming|constructor)`), false, 'anyOf');
  t.equal(r.has(`constructor+`), false, 'manyOf');
  t.equal(r.has(`constructor{2,4}`), false, 'someOf');
  t.end();
});

test('test-infinite-loop', function(t) {
  var weirdDoc = nlp('^ ? * . + $');
  weirdDoc.match('is?');
  weirdDoc.match('.?');
  weirdDoc.match('*');
  weirdDoc.match('.+');
  weirdDoc.match('+');
  weirdDoc.match('?');
  weirdDoc.match('.');
  weirdDoc.match('? * . +');
  weirdDoc.not('?');
  weirdDoc.not('*');
  weirdDoc.not('^');
  weirdDoc.not('$');
  weirdDoc.not('+');
  weirdDoc.not('? * . +');
  t.ok(true, 'didnt regress');

  var str = 'And you are?. Marshal';
  var have = nlp(str).sentences().out();
  t.equal(have, str, 'regression #1');

  str = `- where is she.Oh.  you guys don't know?`;
  have = nlp(str).sentences().out();
  t.equal(have, str, 'regression #2');

  t.end();
});
