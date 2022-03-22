import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[one/punct] '

test('normalize elipses', function (t) {
  const str = `[hello] spencęr…`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-1')
  t.equal(doc.text('normal'), 'hello spencer...', here + 'normal out-1')
  t.end()
})

test('normalize question mark', function (t) {
  const str = `hello, Spencęr???`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-2')
  t.equal(doc.text('normal'), 'hello, spencer?', here + 'normal out-2')
  t.end()
})

test('hyphenated', function (t) {
  let doc = nlp('and check this out! a walk-in microwave.')
  doc.hyphenated().deHyphenate()
  t.equal(doc.text(), 'and check this out! a walk in microwave.', here + 'dehyphenate')
  t.end()
})

test('normalize unicode', function (t) {
  // const str = `• Spencęr & JOhn™ ⟨lmt⟩.`
  const str = ` Spencęr & JOhn™ ⟨lmt⟩.`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out')
  t.equal(doc.text('reduced'), 'spencer & john lmt', here + 'normal out')
  t.end()
})

test('normalize quotes ', function (t) {
  const str = `،one’ «two» ‘three’ “four” 'five' "six."`
  const doc = nlp(str)
  t.equal(doc.text(), str, 'text out-3')
  t.equal(doc.text('clean'), 'one two three four five six.', here + 'normal out-3')
  t.end()
})

test('toParentheses', function (t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('the harvard of #Place').toParentheses()
  t.equal(doc.text(), 'you could still go to McGill, (the Harvard of Canada)!', here + 'toparentheses')
  t.end()
})

test('toQuotation', function (t) {
  let doc = nlp(`you could still go to McGill, the Harvard of Canada!`)
  doc.match('harvard of #Place').toQuotation()
  t.equal(doc.text(), 'you could still go to McGill, the "Harvard of Canada"!', here + 'toparentheses')
  t.end()
})

test('hasQuotation', function (t) {
  let m = nlp(`seems to scream 'silence'`).match('@hasQuotation')
  t.equal(m.text(), 'silence', 'hasQuotation')

  m = nlp(`seems to scream 'silence all' and "watch this"`).match('@hasQuotation+')
  t.equal(m.eq(0).text(), 'silence all', here + 'two scare-quotes')
  t.equal(m.eq(1).text(), 'watch this', here + 'watch this')
  t.end()
})
