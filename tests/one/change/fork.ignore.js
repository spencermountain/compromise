import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/fork] '

test('fork basic:', function (t) {
  const before = nlp.fork()
  const a = before('hello donkey kong', { donkey: 'Person' })
  const b = nlp('donkey')
  t.equal(a.has('#Person'), true, here + 'has person')
  t.equal(b.has('#Person'), false, here + 'does not have person')
  t.end()
})
