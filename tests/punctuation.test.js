const test = require('tape')
const nlp = require('./_lib')

test('normalize elipses', function(t) {
  const str = `[hello] spencęr…`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-1')
  t.equal(doc.text('normal'), 'hello spencer...', 'normal out-1')
  t.end()
})

test('normalize question mark', function(t) {
  const str = `hello, Spencęr???`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-2')
  t.equal(doc.text('normal'), 'hello, spencer?', 'normal out-2')
  t.end()
})

// test('normalize unicode', function(t) {
//   const str = `• Spencęr & JOhn™ ⟨lmt⟩.`;
//   const doc = nlp(str);
//   t.equal(doc.text(), str, 'text out');
//   t.equal(doc.text(), 'spencer & john lmt', 'normal out');
//   t.end();
// });

// test('normalize quotes ', function(t) {
//   const str = `،one’ «two» ‘three’ “four” 'five' "six."`
//   const doc = nlp(str)
//   t.equal(doc.text(), str, 'text out-3')
//   t.equal(doc.text(), 'one two three four five six.', 'normal out-3')
//   t.end()
// })

test('toParentheses', function(t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('the harvard of #Place').toParentheses()
  t.equal(doc.text(), 'you could still go to McGill, (the Harvard of Canada)!', 'toparentheses')
  t.end()
})
test('toQuotation', function(t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('harvard of #Place').toQuotation()
  t.equal(doc.text(), 'you could still go to McGill, the "Harvard of Canada"!', 'toparentheses')
  t.end()
})
