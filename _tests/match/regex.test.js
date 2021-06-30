const test = require('tape')
const nlp = require('../_lib')

test('regex-match:', function (t) {
  let doc = nlp('it is waaaay cool')
  let m = doc.match('/aaa/')
  t.equal(m.out('normal'), 'waaaay', 'basic-match')

  m = doc.match('/[ao]{2}/')
  t.equal(m.out('array').length, 2, 'trickier-match')

  m = doc.match('is /aaam?/ .')
  t.equal(m.out('normal'), 'is waaaay cool', 'trickier-match')

  m = doc.match('#Copula /a+/ /ool$/')
  t.equal(m.out('normal'), 'is waaaay cool', 'even-trickier-match')

  t.end()
})
