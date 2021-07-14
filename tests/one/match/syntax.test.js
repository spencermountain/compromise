import test from 'tape'
import nlp from '../lib/_lib.js'

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
  // t.equals(doc.match('!(!other|!spencer)').text(), '', 'double-tricky')
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

test('regex tokenization', function (t) {
  let arr = [
    ['this/isoneword', 1],
    ['this/isone/word', 1],
    ['thisis(one)word', 1],
    ['(thisisoneword)', 1],
    ['(this/is/oneword)', 1],
    ['one /two/ three', 3],
    ['one /t(foob)3(2)*kwo/ three', 3],
    ['one /^t*.(.)+kwo$/ three', 3],
    ['/flubber trouble/', 1],
    ['one /reg with spaces/ three', 3],
    ['one (block with spaces) three', 3],
    ['one (/block/ with /spaces/) three', 3],
    ['one (/block/|with|/^spa(ce)?s/) three', 3],
    ['one (a|/block/  |./) three f', 4],
    ['before /foo bar/ and  (yes sir)', 4],
    ['before /foo  (bar)/ and (yes |/foo bar/|sir)', 4],
    // prefix/suffix
    ['one /optional reg/? three', 3],
    ['one (optional /block/)? three', 3],
    ['one !(optional two|!#Block)* three', 3],
    ['one [(inside two)] three', 3],
    // named-groups
    ['i saw [<match>(the person|#Pronoun|tina turner)]', 3],
    ['before [<w>(one two)] after', 3],
    ['before [< word >/one two/] after', 3],
    ['[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)', 3],
    ['[<num>#Value] [<currency>(mark|rand|won|rub|ore)] foo', 3],
    ['(snooze|wait|delay|punt|later|sleep) (up to) [<snooze_to>#Date+]', 3],
    ['(snooze sleep) (up to) [<snooze_to>#Date+]?', 3],
    ['(snooze sleep) (up|to) [<snooze_to>#Date+]? (fourth)?', 4],
    // ['/snooze sleep/ /up to/ [<snooze_to>#Date+]?', 3], //known issue
  ]
  arr.forEach(a => {
    let regs = nlp.parseMatch(a[0])
    // let regs = parse(a[0])
    t.equals(regs.length, a[1], a[0])
  })
  t.end()
})
