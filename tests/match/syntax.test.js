const test = require('tape')
const nlp = require('../_lib')

test('negative parentheses', function (t) {
  let doc = nlp.tokenize('if he does. does he?')
  let m = doc.if('!^(if|cool)')
  t.equals(m.out('normal'), 'does he?', 'negative-start')

  m = doc.if('^!(if|cool)')
  t.equals(m.out('normal'), 'does he?', 'start-negative')

  doc = nlp.tokenize('spencer other')
  t.equals(doc.match('(cool|spencer)').text(), 'spencer', 'optional-true')
  t.equals(doc.match('!(cool|spencer)').text(), 'other', 'outside-negative')
  t.equals(doc.match('!(foobar)').text(), 'spencer other', 'has-everthing')
  t.equals(doc.match('(!spencer)').text(), 'other', 'has-other')
  t.equals(doc.match('!(spencer)').text(), 'other', 'has-other-outside')
  t.equals(doc.match('(!other|!spencer)').text(), 'spencer other', 'tricky-negative-swap')
  t.equals(doc.match('!(!other|!spencer)').text(), '', 'double-tricky')
  t.end()
})

test('start-end parentheses', function (t) {
  let doc = nlp("matt does but matthew doesn't")
  let m = doc.match('^(/matt/|frank) .')
  t.equals(m.out('normal'), 'matt does', 'choice-start')

  m = doc.match('(^#Person|#Person$)')
  t.equals(m.out('normal'), 'matt', 'matt-start')

  doc = nlp("now matt doesn't but yes for matthew")
  m = doc.match('(^#Person|#Person$)')
  t.equals(m.out('normal'), 'matthew', 'matthew-end')

  doc = nlp("now matt doesn't but yes for matthew")
  m = doc.match('(woo|#Person)$')
  t.equals(m.out('normal'), 'matthew', 'matthew-end-outside')
  t.end()
})
