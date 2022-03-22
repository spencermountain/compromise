import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-isPlural] '

test('plural-verbs:', function (t) {
  let r = nlp('i look. Spencer looks.')
  let len = r.verbs().isPlural().length
  t.equal(len, 1, here + 'i singular')

  r = nlp('we look at it. They report on it')
  len = r.verbs().isPlural().length
  t.equal(len, 2, here + 'they plural')

  r = nlp('lkjsdf are cool')
  let str = r.verbs().isPlural().out('normal')
  t.equal(str, 'are', here + 'are plural')

  r = nlp('lkjsdf does eat bugs')
  str = r.verbs().isPlural().out('normal')
  t.equal(str, 'does eat', here + 'does plural')

  r = nlp('lkjsdf is cool')
  str = r.verbs().isPlural().out('normal')
  t.equal(str, '', here + 'is singular')
  t.end()
})
