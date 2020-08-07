const test = require('tape')
const nlp = require('../_lib')

/*
 * Capture group doesn't work for .+ or *
 * https://github.com/spencermountain/compromise/issues/654
 */

test('issue-654: named greedy capture', function (t) {
  let m

  m = nlp('ralf eats the glue').match('ralf eats [<target>*]').groups('target')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [<target>*] glue').groups('target')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  m = nlp('ralf eats the glue').match('ralf eats [<target>.+]').groups('target')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [<target>.+] glue').groups('target')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  t.end()
})

test('issue-654: greedy capture', function (t) {
  let m

  m = nlp('ralf eats the glue').match('ralf eats [*]', 0)
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [*] glue', 0)
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  m = nlp('ralf eats the glue').match('ralf eats [.+]', 0)
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [.+] glue', 0)
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  t.end()
})

test('test greedy min/max', function (t) {
  let doc = nlp('hello John, Lisa, Fred').match('#FirstName{3,6}')
  t.equal(doc.text(), 'John, Lisa, Fred', 'min met')

  doc = nlp('hello John, Lisa, Fred').match('#FirstName{4,6}')
  t.equal(doc.found, false, 'min not met')

  doc = nlp('hello John, Lisa, Fred').match('#FirstName{1,2}')
  t.equal(doc.eq(0).text(), 'John, Lisa', 'max-match')
  t.equal(doc.eq(1).text(), 'Fred', 'max-over-run')
  t.end()
})
