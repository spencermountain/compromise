const test = require('tape')
const nlp = require('./_lib')

test('normalize elipses', function (t) {
  const str = `[hello] spencęr…`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-1')
  t.equal(doc.text('normal'), 'hello spencer...', 'normal out-1')
  t.end()
})

test('normalize question mark', function (t) {
  const str = `hello, Spencęr???`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-2')
  t.equal(doc.text('normal'), 'hello, spencer?', 'normal out-2')
  t.end()
})

test('hyphenated', function (t) {
  let doc = nlp('and check this out! a walk-in microwave.')
  doc.hyphenated().deHyphenate()
  t.equal(doc.text(), 'and check this out! a walk in microwave.', 'dehyphenate')
  t.end()
})

test('normalize unicode', function (t) {
  // const str = `• Spencęr & JOhn™ ⟨lmt⟩.`
  const str = ` Spencęr & JOhn™ ⟨lmt⟩.`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out')
  t.equal(doc.text('reduced'), 'spencer & john lmt', 'normal out')
  t.end()
})

test('normalize quotes ', function (t) {
  const str = `،one’ «two» ‘three’ “four” 'five' "six."`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-3')
  t.equal(doc.text('clean'), 'one two three four five six.', 'normal out-3')
  t.end()
})

test('toParentheses', function (t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('the harvard of #Place').toParentheses()
  t.equal(doc.text(), 'you could still go to McGill, (the Harvard of Canada)!', 'toparentheses')
  t.end()
})

test('toQuotation', function (t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('harvard of #Place').toQuotation()
  t.equal(doc.text(), 'you could still go to McGill, the "Harvard of Canada"!', 'toparentheses')
  t.end()
})

test('hasQuotation', function (t) {
  let m = nlp(`seems to scream 'silence'`).match('@hasQuotation')
  t.equal(m.text(), 'silence', 'hasQuotation')

  m = nlp(`seems to scream 'silence all' and "watch this"`).match('@hasQuotation+')
  t.equal(m.eq(0).text(), 'silence all', 'two scare-quotes')
  t.equal(m.eq(1).text(), 'watch this', 'watch this')
  t.end()
})
