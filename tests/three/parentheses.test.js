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
