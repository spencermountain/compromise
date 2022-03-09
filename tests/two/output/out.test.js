import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/out] '

test('out-tags', function (t) {
  let out = nlp(`he's cool.`).out('tags')
  t.equal(out.length, 1, 'one sentence')
  out[0] = out[0] || { he: [], is: [], cool: [] }
  out[0] = Object.assign(out[0], { he: [], is: [], cool: [] })
  t.equal(out[0].he.indexOf('Pronoun') !== -1, true, here + 'has he:Pronoun')
  t.equal(out[0].is.indexOf('Copula') !== -1, true, here + 'has is:Copula')
  t.equal(out[0].cool.indexOf('Adjective') !== -1, true, here + 'has cool:Adjective')
  t.end()
})

test('out-topk', function (t) {
  let doc = nlp(`What'd I say? Monorail. and it called? Monorail.`)
  let out = doc.out('freq')
  // t.equal(out.length, 3, here + 'three results')
  t.equal(out[0].normal, 'monorail', here + 'top-result is most-frequent')
  t.equal(out[0].freq, 2, here + 'got count')
  t.end()
})

test('out-array', function (t) {
  let arr = nlp('1-2').terms().out('array')
  t.equal(arr.length, 1, here + 'one result')
  t.equal(arr[0], '1-2', here + 'got contraction text')
  t.end()
})

test('out-wrap', function (t) {
  let doc = nlp("soft and yielding like a nerf ball")
  let out = doc.out({
    '#Adjective': (m) => `[${m.text()}]`
  })
  t.equal(out, `[soft] and [yielding] like a nerf ball`, 'two matches')
  t.end()
})
