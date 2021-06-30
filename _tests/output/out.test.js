const test = require('tape')
const nlp = require('../_lib')

test('out-tags', function (t) {
  let out = nlp(`he's cool.`).out('tags')
  t.equal(out.length, 1, 'one sentence')
  t.equal(out[0].he.indexOf('Pronoun') !== -1, true, 'has he:Pronoun')
  t.equal(out[0].is.indexOf('Copula') !== -1, true, 'has is:Copula')
  t.equal(out[0].cool.indexOf('Adjective') !== -1, true, 'has cool:Adjective')
  t.end()
})
test('out-topk', function (t) {
  let doc = nlp(`What'd I say? Monorail. What's it called? Monorail.`)
  let out = doc.out('freq')
  t.equal(out.length, 3, 'three results')
  t.equal(out[0].reduced, 'monorail', 'top-result is most-frequent')
  t.equal(out[0].count, 2, 'got count')
  t.end()
})

test('out-array', function (t) {
  let arr = nlp('1-2').terms().out('array')
  t.equal(arr.length, 1, 'one result')
  t.equal(arr[0], '1-2', 'got contraction text')
  t.end()
})
