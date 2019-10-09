const test = require('tape')
const nlp = require('./_lib')

test('sortAlpha:', function(t) {
  const str = 'John xoo, John fredman, John davis, John fredman,'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alpha')
  const want = ['john davis', 'john fredman', 'john fredman', 'john xoo']
  t.deepEqual(r.out('array'), want, 'sort-alpha')
  t.end()
})

test('sortChronological:', function(t) {
  const str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alphabetical')
  r.sort('chronological')
  const want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'sort-chron')
  t.end()
})

test('reverse:', function(t) {
  const str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alphabetical')
  r.reverse()
  const want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'alpha-reverse')
  t.end()
})

test('length:', function(t) {
  const str = 'Amy, John Fredman, Dr. Bill, Alexis Smithsonian'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.sort('length')
  r.reverse()
  const want = ['amy', 'dr bill', 'john fredman', 'alexis smithsonian']
  t.deepEqual(r.out('array'), want, 'sort length')
  t.end()
})

test('wordCount:', function(t) {
  const str = 'John Fredman, Amy, Dr. Bill G. Gates'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.sort('wordCount')
  r.reverse()
  const want = ['dr bill g gates', 'john fredman', 'amy']
  t.deepEqual(r.out('array'), want, 'sort-wordcount')
  t.end()
})

test('unique:', function(t) {
  const str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r.unique()
  const want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'sort-unique')
  t.end()
})

test('frequency:', function(t) {
  const str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  const a = r.out('frequency')
  t.equal(a[0].normal, 'john xoo', 'topk is sorted')
  t.equal(a[0].count, 2, 'topk finds two')
  t.end()
})
