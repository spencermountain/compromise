var test = require('tape')
var nlp = require('./_lib')

test('normalize elipses', function(t) {
  var str = `[hello] spencęr…`
  var doc = nlp(str)
  t.equal(doc.text(), str, 'text out-1')
  t.equal(doc.normal(), 'hello spencer...', 'normal out-1')
  t.end()
})

test('normalize question mark', function(t) {
  var str = `hello, Spencęr???`
  var doc = nlp(str)
  t.equal(doc.text(), str, 'text out-2')
  t.equal(doc.normal(), 'hello, spencer?', 'normal out-2')
  t.end()
})

// test('normalize unicode', function(t) {
//   var str = `• Spencęr & JOhn™ ⟨lmt⟩.`;
//   var doc = nlp(str);
//   t.equal(doc.text(), str, 'text out');
//   t.equal(doc.text(), 'spencer & john lmt', 'normal out');
//   t.end();
// });

// test('normalize quotes ', function(t) {
//   var str = `،one’ «two» ‘three’ “four” 'five' "six."`
//   var doc = nlp(str)
//   t.equal(doc.text(), str, 'text out-3')
//   t.equal(doc.text(), 'one two three four five six.', 'normal out-3')
//   t.end()
// })
