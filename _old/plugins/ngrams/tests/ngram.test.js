const test = require('tape')
const nlp = require('./_lib')

test('ngram-test:', function(t) {
  const r = nlp('he is strong. he is cool')
  const arr = r.ngrams()

  t.equal(arr[0].normal, 'he is', 'sorted-by-freq')
  t.equal(arr[0].count, 2, 'normalized-counted')
  t.equal(arr[0].size, 2, 'normalized-counted')

  t.equal(arr.length, 9, 'ngram-length')
  t.end()
})

test('sort-bigrams:', function(t) {
  const r = nlp('he is strong. he is cool')
  const arr = r.ngrams({
    size: 2,
  })
  t.equal(arr[0].normal, 'he is', '#1-by-freq')
  t.equal(arr[1].normal, 'is strong', '#2-by-freq')
  t.equal(arr[2].normal, 'is cool', '#3-by-freq')
  t.equal(arr.length, 3, 'ngram-length')
  t.end()
})

test('contractions-support:', function(t) {
  const r = nlp("It's free for me and free for you")
  const arr = r.ngrams()
  const obj = arr.find(o => o.normal === 'free for')
  t.equal(obj.count, 2, 'dont include empty contraction')
  t.end()
})

test('ngrams-options:', function(t) {
  let doc = nlp('one two three four five, one two three four five, one two three four five')
  let arr = doc.ngrams({
    max: 5,
  })
  t.equal(arr[0].size, 5, 'ngram-max-size-5')
  arr = doc.ngrams({
    max: 2,
  })
  t.equal(arr[0].size, 2, 'ngram-max-size-2')
  arr = doc.ngrams({
    max: 9,
  })
  t.equal(arr[0].size, 5, 'ngram-max-size-9')

  arr = doc.ngrams({
    size: 2,
  })
  t.equal(arr[0].size, 2, 'ngram-size-2')
  arr = doc.ngrams({
    size: 4,
  })
  t.equal(arr[0].size, 4, 'ngram-size-4')
  t.end()
})
