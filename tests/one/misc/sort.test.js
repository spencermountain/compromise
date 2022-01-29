import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/sort] '

test('sortAlpha:', function (t) {
  const str = 'John xoo, John fredman, John davis, John fredman,'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.sort('alpha')
  const want = ['John davis,', 'John fredman,', 'John fredman,', 'John xoo,']
  t.deepEqual(r.out('array'), want, here + 'sort-alpha')
  t.end()
})

test('sortSequential:', function (t) {
  const str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.sort('alphabetical')
  r = r.sort('seq')
  const want = ['John xoo,', 'John fredman,', 'John davis']
  t.deepEqual(r.out('array'), want, here + 'sort-chron')
  t.end()
})

test('reverse:', function (t) {
  const str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.sort('alphabetical')
  r = r.reverse()
  const want = ['John xoo,', 'John fredman,', 'John davis']
  t.deepEqual(r.out('array'), want, here + 'alpha-reverse')
  t.end()
})

test('freq:', function (t) {
  const str = 'John xoo, John fredman, John davis'
  let r = nlp(str)
  r = r.terms()
  r = r.sort('freq')
  const want = ['John', 'John', 'John', 'xoo,', 'fredman,', 'davis']
  t.deepEqual(r.out('array'), want, here + 'freq-reverse')
  t.end()
})

test('length:', function (t) {
  const str = 'Amy, John Fredman, Dr. Bill, Alexis Smithsonian'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.sort('length')
  r = r.reverse()
  const want = ['Amy,', 'Dr. Bill,', 'John Fredman,', 'Alexis Smithsonian']
  t.deepEqual(r.out('array'), want, here + 'sort length')
  t.end()
})

test('wordCount:', function (t) {
  const str = 'John Fredman, Amy, Dr. Bill G. Gates'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.sort('wordCount')
  r.reverse()
  const want = ['Dr. Bill G. Gates', 'John Fredman,', 'Amy,']
  t.deepEqual(r.out('array'), want, here + 'sort-wordcount')
  t.end()
})

test('unique:', function (t) {
  const str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  r = r.unique()
  const want = ['John xoo,', 'John fredman,', 'John davis']
  t.deepEqual(r.out('array'), want, here + 'sort-unique')
  t.end()
})

test('custom-sort:', function (t) {
  let doc = nlp('Eeny, meeny, miny, moe')
  let terms = doc.terms()
  terms.sort((a, b) => {
    a = a.text('normal')
    b = b.text('normal')
    if (a.length > b.length) {
      return -1
    }
    if (a.length < b.length) {
      return 1
    }
    return 0
  })
  let arr = terms.map(d => d.text('normal'))
  t.deepEqual(arr, ['meeny, ', 'eeny, ', 'miny, ', 'moe'], here + 'custom sort output')
  t.end()
})

test('frequency:', function (t) {
  const str = 'John xoo, John fredman, john xoo, John davis'
  let r = nlp(str)
  r = r.split('@hasComma')
  const a = r.out('frequency')
  t.equal(a[0].reduced, 'john xoo', here + 'topk is sorted')
  t.equal(a[0].count, 2, here + 'topk finds two')
  t.end()
})
