import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/keep-cache] '

test('keep cache', function (t) {
  const doc = nlp('one two three. four five six. seven eight nine.')
  doc.cache()

  // eq
  let cache = doc.eq(1)._cache || []
  t.ok(cache[0] && cache[0].has('six'), here + 'eq')

  // first
  cache = doc.first()._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'first')

  // if
  cache = doc.if('four')._cache || []
  t.ok(cache[0] && cache[0].has('five'), here + 'if')

  // ifNo
  cache = doc.ifNo('four')._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'ifNo')

  // titlecase
  cache = doc.toTitleCase()._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'titlecase')

  // hyphenate
  cache = doc.hyphenate()._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'hyphenate')

  // reverse
  cache = doc.reverse()._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'reverse')

  // sort
  // cache = doc.sort('alpha')._cache || []
  // t.ok(cache[0] && cache[0].has('one'), here + 'sort')

  t.end()
})


test('cache in match', function (t) {
  const doc = nlp('one two three four')
  const m = doc.match('one two three')
  m.tag('. #Person .')
  t.equal(doc._cache, null, here + 'invalidate parent cache')
  t.end()
})


test('remove cache', function (t) {
  const doc = nlp('one two three. four five six. seven eight nine.')
  doc.cache()

  // tag
  let cache = doc.tag('Foog')._cache
  t.ok(!cache || !cache[0], here + 'tag')

  doc.cache()
  cache = doc.unTag('Foog')._cache
  t.ok(!cache || !cache[0], here + 'untag')

  doc.cache()
  cache = doc.terms()._cache
  t.ok(!cache || !cache[0], here + 'terms')

  doc.cache()
  cache = doc.replace('two', 'deux')._cache
  t.ok(!cache || !cache[0], here + 'replace')

  doc.cache()
  cache = doc.remove('three')._cache
  t.ok(!cache || !cache[0], here + 'remove')

  doc.cache()
  cache = doc.eq(1).prepend('foo')._cache
  t.ok(!cache || !cache[0], here + 'prepend')

  t.end()
})

test('cache in loops', function (t) {
  const doc = nlp('one two match. three match four. match five six.')
  doc.cache()
  doc.map((m, i) => {
    const cache = m._cache || []
    t.ok(cache[0] && cache[0].has('match'), `map ${i}`)
  })

  doc.cache()
  doc.forEach((m, i) => {
    const cache = m._cache || []
    t.ok(cache[0] && cache[0].has('match'), `foreach ${i}`)
  })

  doc.cache()
  doc.filter((m, i) => {
    const cache = m._cache || []
    t.ok(cache[0] && cache[0].has('match'), `filter ${i}`)
  })

  doc.cache()
  doc.some((m, i) => {
    const cache = m._cache || []
    t.ok(cache[0] && cache[0].has('match'), `some ${i}`)
  })
  t.end()
})