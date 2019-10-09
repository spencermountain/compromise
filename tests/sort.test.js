var test = require('tape')
var nlp = require('./_lib')

test('sortAlpha:', function(t) {
  var str = 'John xoo, John fredman, John davis, John fredman,'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alpha')
  var want = ['john davis', 'john fredman', 'john fredman', 'john xoo']
  t.deepEqual(r.out('array'), want, 'sort-alpha')
  t.end()
})

test('sortChronological:', function(t) {
  var str = 'John xoo, John fredman, John davis'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alphabetical')
  r.sort('chronological')
  var want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'sort-chron')
  t.end()
})

test('reverse:', function(t) {
  var str = 'John xoo, John fredman, John davis'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.sort('alphabetical')
  r.reverse()
  var want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'alpha-reverse')
  t.end()
})

test('length:', function(t) {
  var str = 'Amy, John Fredman, Dr. Bill, Alexis Smithsonian'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.sort('length')
  r.reverse()
  var want = ['amy', 'dr bill', 'john fredman', 'alexis smithsonian']
  t.deepEqual(r.out('array'), want, 'sort length')
  t.end()
})

test('wordCount:', function(t) {
  var str = 'John Fredman, Amy, Dr. Bill G. Gates'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.sort('wordCount')
  r.reverse()
  var want = ['dr bill g gates', 'john fredman', 'amy']
  t.deepEqual(r.out('array'), want, 'sort-wordcount')
  t.end()
})

test('unique:', function(t) {
  var str = 'John xoo, John fredman, john xoo, John davis'
  var r = nlp(str)
  r = r.split('@hasComma')
  r.unique()
  var want = ['john xoo', 'john fredman', 'john davis']
  t.deepEqual(r.out('array'), want, 'sort-unique')
  t.end()
})

test('frequency:', function(t) {
  var str = 'John xoo, John fredman, john xoo, John davis'
  var r = nlp(str)
  r = r.split('@hasComma')
  var a = r.out('frequency')
  t.equal(a[0].normal, 'john xoo', 'topk is sorted')
  t.equal(a[0].count, 2, 'topk finds two')
  t.end()
})
