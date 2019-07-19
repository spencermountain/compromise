var test = require('tape')
var nlp = require('../_lib')

test('inline tagging linear:', function(t) {
  var r = nlp('one two three four')

  r.match('one two three').tag('. #Person .')
  var found = r.match('#Person').out('normal')
  t.equal(found, 'two', 'skip-tag-skip')

  r.match('one two three').tag('#FooBar .')
  found = r.match('#FooBar').out('normal')
  t.equal(found, 'one', 'tag-skip-null')

  r.match('two three').tag('#Two #Three #Four')
  t.equal(r.match('#Two').out('normal'), 'two', 'two-is-two')
  t.equal(r.match('#Three').out('normal'), 'three', 'three-is-three')
  t.equal(r.match('#Four').out('normal'), '', 'four is ignored')

  t.end()
})

test('compound tags from lexicon:', function(t) {
  var doc = nlp('it was cold')
  var arr = doc.match('#Verb+')
  t.equal(arr.length, 1, 'one verb')
  t.equal(arr.has('#PastTense'), true, 'past-tense')
  t.end()
})
