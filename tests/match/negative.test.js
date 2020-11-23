const test = require('tape')
const nlp = require('../_lib')

test('! negative match syntax :', function (t) {
  let doc = nlp.tokenize('one two three')
  let m = doc.match('one !two three')
  t.equal(m.text(), '', 'ban-not')

  doc = nlp.tokenize('one two three')
  m = doc.match('one !foo three')
  t.equal(m.text(), 'one two three', 'swap-not')

  doc = nlp.tokenize('one two three')
  m = doc.match('one !foo? two three')
  t.equal(m.text(), 'one two three', 'skip-not')

  t.end()
})
