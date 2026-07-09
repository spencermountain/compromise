import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/punctuation-match] '

test('punctuation-match :', function (t) {
  let regs = [{ word: 'may' }, { pre: '(' }]
  let m = nlp('may, (cool) foo').match(regs)
  t.equal(m.text(), 'may, (cool)', here + '(pre')

  regs = [{ word: 'may' }, { post: ')' }]
  m = nlp('may, (cool) foo').match(regs)
  t.equal(m.text(), 'may, (cool)', here + 'post)')

  regs = [{ word: 'may' }, { post: ')' }]
  m = nlp('may, (cool) foo').match(regs)
  t.equal(m.text(), 'may, (cool)', here + 'post)')

  regs = [{ post: ',' }]
  m = nlp('may, (cool) foo').match(regs)
  t.equal(m.text(), 'may,', here + 'post,')
  t.end()
})