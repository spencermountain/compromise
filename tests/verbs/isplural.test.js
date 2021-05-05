const test = require('tape')
const nlp = require('../_lib')

test('plural-verbs:', function (t) {
  let r = nlp('i look. Spencer looks.')
  let len = r.verbs().isPlural().length
  t.equal(len, 1, 'i singular')

  r = nlp('we look at it. They report on it')
  len = r.verbs().isPlural().length
  t.equal(len, 2, 'they plural')

  r = nlp('lkjsdf are cool')
  let str = r.verbs().isPlural().out('normal')
  t.equal(str, 'are', 'are plural')

  r = nlp('lkjsdf does eat bugs')
  str = r.verbs().isPlural().out('normal')
  t.equal(str, 'does eat', 'does plural')

  r = nlp('lkjsdf is cool')
  str = r.verbs().isPlural().out('normal')
  t.equal(str, '', 'is singular')
  t.end()
})
