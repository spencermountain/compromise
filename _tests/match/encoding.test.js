const test = require('tape')
const nlp = require('../_lib')

test('encoding-match:', function (t) {
  const r = nlp('it is * nice')
  const str = r.match('is \\*').trim().out()
  t.equal(str, 'is *', 'encode asterix')

  // r = nlp('it is + nice');
  // str = r.match('is \\+ nice').trim().out();
  // t.equal(str, 'is + nice', 'encode plus');

  t.end()
})

test('reserved-word-in-src:', function (t) {
  const r = nlp('buy eggs constructor yeah prototype')
  t.equal(r.has(`backburner`), false, 'single')
  t.equal(r.has(`#Foo`), false, 'tag')
  t.equal(r.has(`(upcoming|backburner)`), false, 'anyOf')
  t.equal(r.has(`lala+`), false, 'manyOf')
  t.equal(r.has(`nword{2,4}`), false, 'someOf')
  t.end()
})

test('reserved-word-in-match:', function (t) {
  const r = nlp('fo foo fulala repeat')
  t.equal(r.has(`constructor`), false, 'single')
  t.equal(r.has(`#constructor`), false, 'tag')
  t.equal(r.has(`(upcoming|constructor)`), false, 'anyOf')
  t.equal(r.has(`constructor+`), false, 'manyOf')
  t.equal(r.has(`constructor{2,4}`), false, 'someOf')
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
  t.ok(true, 'didnt regress')

  let str = 'And you are?. Marshal'
  let have = nlp(str).all().out()
  t.equal(have, str, 'regression #1')

  str = `- where is she.Oh.  you guys don't know?`
  have = nlp(str).all().out()
  t.equal(have, str, 'regression #2')

  t.end()
})
