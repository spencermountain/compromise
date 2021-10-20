const test = require('tape')
const nlp = require('./_lib')

test('edgegram-sizes:', function(t) {
  const r = nlp(`he is cool. john was cool. He is really nice.`)

  let arr = r.startGrams({ size: 5 })
  t.equal(arr.length, 0, 'no-overgrams')

  arr = r.startGrams({ size: 4 })
  t.equal(arr.length, 1, 'one-4-startgram')
  arr = r.startGrams({ size: 3 })
  t.equal(arr.length, 3, 'found-3-startgrams')
  arr = r.startGrams({ size: 2 })
  t.equal(arr.length, 2, 'found-2-startgrams')

  arr = r.endGrams({ size: 4 })
  t.equal(arr.length, 1, 'one-4-endgram')
  arr = r.endGrams({ size: 3 })
  t.equal(arr.length, 3, 'found-3-endgram')

  arr = r.nGrams({ size: 5 })
  t.equal(arr.length, 0, 'zero-5-ngram')
  arr = r.nGrams({ size: 4 })
  t.equal(arr.length, 1, 'one-4-ngram')
  arr = r.nGrams({ size: 3 })
  t.equal(arr.length, 4, 'four-3-ngrams')
  arr = r.nGrams({ size: 2 })
  t.equal(arr.length, 6, 'six-2-ngrams')

  t.end()
})

test('edgegram:', function(t) {
  let doc = nlp('my birthday is June 5th my birthday')
  let arr = doc.edgegrams()
  t.equal(arr[0].normal, 'my birthday', 'combine edges')
  t.equal(arr[0].count, 2, 'found both edges')
  t.end()
})

test('start-sizes:', function(t) {
  const r = nlp(`he is cool. john was cool. He is really nice.`)
  const arr = r.startGrams()
  t.equal(arr[0].normal, 'he is', 'sorted-by-freq')
  t.equal(arr[0].count, 2, 'normalized-counted')
  t.equal(arr[0].size, 2, 'normalized-counted')
  t.end()
})
