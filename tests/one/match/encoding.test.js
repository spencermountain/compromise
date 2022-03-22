import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/encoding] '

// test('encoding-match:', function (t) {
//   let r = nlp('it is * nice')
//   let str = r.match('is \\*').out().trim()
//   t.equal(str, 'is *', 'encode asterix')

//   r = nlp('it is + nice');
//   str = r.match('is \\+ nice').trim().out();
//   t.equal(str, 'is + nice', 'encode plus');

//   t.end()
// })

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
