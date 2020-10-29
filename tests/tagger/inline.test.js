const test = require('tape')
const nlp = require('../_lib')

test('inline tagging linear:', function (t) {
  let r = nlp('one two three four')

  r.match('one two three').tag('. #Person .')
  let found = r.match('#Person').out('normal')
  t.equal(found, 'two', 'skip-tag-skip')

  r.match('one two three').tag('#FooBar .')
  found = r.match('#FooBar').out('normal')
  t.equal(found, 'one', 'tag-skip-null')

  r.match('two three').tag('#TwoTag #ThreeTag #FourTag')
  t.equal(r.match('#TwoTag').out('normal'), 'two', 'two-is-two')
  t.equal(r.match('#ThreeTag').out('normal'), 'three', 'three-is-three')
  t.equal(r.match('#FourTag').out('normal'), '', 'four is ignored')

  t.end()
})

test('compound tags from lexicon:', function (t) {
  const doc = nlp('it was cold')
  const arr = doc.match('#Verb+')
  t.equal(arr.length, 1, 'one verb')
  t.equal(arr.has('#PastTense'), true, 'past-tense')
  t.end()
})
