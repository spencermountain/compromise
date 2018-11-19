var test = require('tape');
var nlp = require('../lib/nlp');

test('normalize elipses', function(t) {
  var str = `[hello] spencęr…`;
  var doc = nlp(str);
  t.equal(doc.text(), str, 'text out');
  t.equal(doc.normal(), 'hello spencer...', 'normal out');
  t.end();
});

test('normalize question mark', function(t) {
  var str = `hello, Spencęr???`;
  var doc = nlp(str);
  t.equal(doc.text(), str, 'text out');
  t.equal(doc.normal(), 'hello, spencer?', 'normal out');
  t.end();
});

test('normalize unicode', function(t) {
  var str = `• Spencęr & JOhn™ ⟨lmt⟩.`;
  var doc = nlp(str);
  t.equal(doc.text(), str, 'text out');
  t.equal(doc.normal(), 'spencer & john lmt', 'normal out');
  t.end();
});

test('normalize quotes ', function(t) {
  var str = `،one’ «two» ‘three’ “four” 'five' "six."`;
  var doc = nlp(str);
  t.equal(doc.text(), str, 'text out');
  t.equal(doc.normal(), 'one two three four five six.', 'normal out');
  t.end();
});
