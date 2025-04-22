import test from 'tape'
import nlp from './_lib.js'
const here = '[three/parentheses] '

test('parentheses test', function (t) {
  const arr = [
    [`i heard (the news) today`, 'the news'],
    [`i heard (news) today`, 'news'],
    [`yo. i heard (the very sad news) today`, 'the very sad news'],
    [`i heard (news today`, ''],
  ]
  arr.forEach(function (a) {
    const r = nlp(a[0])
    const str = r.parentheses().out('normal')
    const msg = a[0] + '  -  ' + str
    t.equal(str, a[1], here + msg)
  })
  t.end()
})

test('dirty-parentheses', function (t) {
  const doc = nlp('this is (kinda) messy')
  let m = doc.not('this')
  let str = m.parentheses().text()
  t.equal(str, 'kinda', here + '+not-before')

  m = doc.not('kinda')
  str = m.parentheses().text()
  t.equal(str, '', here + '+not-self')

  m = doc.not('messy')
  str = m.parentheses().text()
  t.equal(str, 'kinda', here + '+not-after')
  t.end()
})

test('partial-parentheses', function (t) {
  const doc = nlp('before (one two three) after')
  let m = doc.not('two')
  let str = m.parentheses().text()
  t.equal(str, '', here + '+not-inside')

  m = doc.not('one')
  str = m.parentheses().text()
  t.equal(str, '', here + '+not-start')

  m = doc.not('three')
  str = m.parentheses().text()
  t.equal(str, '', here + '+not-after')

  t.end()
})
