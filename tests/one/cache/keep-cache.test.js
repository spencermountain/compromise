import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/keep-cache] '

test('keep cache', function (t) {
  let doc = nlp('one two three. four five six. seven eight nine.')
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

  // sort
  cache = doc.sort('alpha')._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'sort')

  // reverse
  cache = doc.reverse()._cache || []
  t.ok(cache[0] && cache[0].has('one'), here + 'reverse')

  t.end()
})


test('remove cache', function (t) {
  let doc = nlp('one two three. four five six. seven eight nine.')
  doc.cache()

  // tag
  let cache = doc.tag('Foo')._cache
  t.ok(!cache || !cache[0], here + 'tag')

  cache = doc.unTag('Foo')._cache
  t.ok(!cache || !cache[0], here + 'untag')

  cache = doc.terms()._cache
  t.ok(!cache || !cache[0], here + 'terms')

  cache = doc.replace('two', 'deux')._cache
  t.ok(!cache || !cache[0], here + 'terms')

  cache = doc.remove('three')._cache
  t.ok(!cache || !cache[0], here + 'terms')

  cache = doc.eq(1).prepend('foo')._cache
  t.ok(!cache || !cache[0], here + 'terms')

  t.end()
})

// test('cache in loops', function (t) {
//   let doc = nlp('one two match. three match four. match five six.')
//   doc.cache()

//   doc.map((m, i) => {
//     let cache = m._cache || []
//     t.ok(cache[0] && cache[0].has('match'), `map ${i}`)
//   })
//   doc.forEach((m, i) => {
//     let cache = m._cache || []
//     t.ok(cache[0] && cache[0].has('match'), `foreach ${i}`)
//   })
//   doc.filter((m, i) => {
//     let cache = m._cache || []
//     t.ok(cache[0] && cache[0].has('match'), `filter ${i}`)
//   })
//   doc.some((m, i) => {
//     let cache = m._cache || []
//     t.ok(cache[0] && cache[0].has('match'), `some ${i}`)
//   })
//   t.end()
// })