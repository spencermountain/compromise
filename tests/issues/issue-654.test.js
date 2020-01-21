const test = require('tape')
const nlp = require('../_lib')

/*
 * Capture group doesn't work for .+ or *
 * https://github.com/spencermountain/compromise/issues/654
 */

test('issue-654: named greedy capture', function(t) {
  let m

  m = nlp('ralf eats the glue')
    .match('ralf eats [<target>*]')
    .byName('target')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue')
    .match('ralf eats [<target>*] glue')
    .byName('target')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  m = nlp('ralf eats the glue')
    .match('ralf eats [<target>.+]')
    .byName('target')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue')
    .match('ralf eats [<target>.+] glue')
    .byName('target')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  t.end()
})

test('issue-654: greedy capture', function(t) {
  let m

  m = nlp('ralf eats the glue').match('ralf eats [*]')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [*] glue')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  m = nlp('ralf eats the glue').match('ralf eats [.+]')
  t.equal(m.out('normal'), 'the glue', 'wildcard capture at the end')

  m = nlp('ralf eats the glue').match('ralf eats [.+] glue')
  t.equal(m.out('normal'), 'the', 'wildcard capture in the middle')

  t.end()
})
