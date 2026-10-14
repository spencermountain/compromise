import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/match/encoding] '

test('encoding-match:', function (t) {
  let doc = nlp('it is + nice')
  t.equal(doc.match('is \\+ nice').text(), 'is + nice', here + 'encode plus')
  t.deepEqual(doc.match('\\+').out('array'), ['+'], here + 'plus alone')
  t.deepEqual(doc.match('!\\+').out('array'), ['it', 'is', 'nice'], here + 'negative plus')

  doc = nlp('a / b c d')
  t.deepEqual(doc.match('\\/').out('array'), ['/'], here + 'encode slash')
  t.deepEqual(doc.match('/').out('array'), ['/'], here + 'slash is not a regex')
  t.equal(doc.match('a \\/ b').text(), 'a / b', here + 'slash in sequence')

  doc = nlp('4 / 2 + 1')
  t.deepEqual(doc.match('(\\+|\\/)').out('array'), ['/', '+'], here + 'encoded choices')
  t.end()
})

test('reserved-word-in-src:', function (t) {
  const r = nlp('buy eggs constructor yeah prototype')
  t.equal(r.has(`backburner`), false, here + 'single')
  t.equal(r.has(`#Foo`), false, here + 'tag')
  t.equal(r.has(`(upcoming|backburner)`), false, here + 'anyOf')
  t.equal(r.has(`lala+`), false, here + 'manyOf')
  t.equal(r.has(`nword{2,4}`), false, here + 'someOf')
  t.end()
})

test('reserved-word-in-match:', function (t) {
  const r = nlp('fo foo fulala repeat')
  t.equal(r.has(`constructor`), false, here + 'single')
  t.equal(r.has(`#constructor`), false, here + 'tag')
  t.equal(r.has(`(upcoming|constructor)`), false, here + 'anyOf')
  t.equal(r.has(`constructor+`), false, here + 'manyOf')
  t.equal(r.has(`constructor{2,4}`), false, here + 'someOf')
  t.end()
})

test('test-infinite-loop', function (t) {
  const weirdDoc = nlp('^ ? * . + $')
  weirdDoc.match('is?')
  weirdDoc.match('.?')
  weirdDoc.match('*')
  weirdDoc.match('.+')
  weirdDoc.match('+')
  weirdDoc.match('?')
  weirdDoc.match('.')
  weirdDoc.match('? * . +')
  weirdDoc.not('?')
  weirdDoc.not('*')
  weirdDoc.not('^')
  weirdDoc.not('$')
  weirdDoc.not('+')
  weirdDoc.not('? * . +')
  t.ok(true, here + 'didnt regress')

  let str = 'And you are?. Marshal'
  let have = nlp(str).all().out()
  t.equal(have, str, here + 'regression #1')

  str = `- where is she.Oh.  you guys don't know?`
  have = nlp(str).all().out()
  t.equal(have, str, here + 'regression #2')

  t.end()
})
