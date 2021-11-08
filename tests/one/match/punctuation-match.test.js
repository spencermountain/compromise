import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/punctuation-match] '

test('punctuation-match :', function (t) {
  let regs = [{ word: 'may' }, { pre: '(' }]
  let m = nlp('may, (2019) foo').match(regs)
  t.equal(m.text(), 'may, (2019)', here + '(pre')

  regs = [{ word: 'may' }, { post: ')' }]
  m = nlp('may, (2019) foo').match(regs)
  t.equal(m.text(), 'may, (2019)', here + 'post)')

  regs = [{ post: ',' }]
  m = nlp('may, (2019) foo').match(regs)
  t.equal(m.text(), 'may,', here + 'post,')
  t.end()
})