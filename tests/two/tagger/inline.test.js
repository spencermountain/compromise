import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/inline] '

test('inline tagging linear:', function (t) {
  let r = nlp('one two three four')

  r.match('one two three').tag('. #Person .')
  let found = r.match('#Person').out('normal')
  t.equal(found, 'two', here + 'skip-tag-skip')

  r.match('one two three').tag('#FooBar .')
  found = r.match('#FooBar').out('normal')
  t.equal(found, 'one', here + 'tag-skip-null')

  r.match('two three').tag('#TwoTag #ThreeTag #FourTag')
  t.equal(r.match('#TwoTag').out('normal'), 'two', here + 'two-is-two')
  t.equal(r.match('#ThreeTag').out('normal'), 'three', here + 'three-is-three')
  t.equal(r.match('#FourTag').out('normal'), '', here + 'four is ignored')

  t.end()
})

test('compound tags from lexicon:', function (t) {
  const doc = nlp('it was cold')
  const arr = doc.match('#Verb+')
  t.equal(arr.length, 1, here + 'one verb')
  t.equal(arr.has('#PastTense'), true, here + 'past-tense')
  t.end()
})
