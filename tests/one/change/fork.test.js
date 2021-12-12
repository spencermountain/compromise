import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/fork] '

test('fork basic:', function (t) {
  let before = nlp.fork()
  let a = before('hello donkey kong', { donkey: 'Person' })
  let b = nlp('donkey')
  t.equal(a.has('#Person'), true, here + 'has person')
  t.equal(b.has('#Person'), false, here + 'does not have person')
  t.end()
})
