import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/hash] '

test('json-hash', function (t) {
  const doc = nlp('fruit salad. food-safety')
  const json = doc.json({ hash: true })
  t.equal(json[0].hash, '3fd5b169e2574a4591ba0127db79a4ca', here + 'fruit salad')
  t.equal(json[1].hash, '68e1fcbeb2b9f8003a97fd2476ef6f2b', here + 'food-safety')

  const same = nlp('food-safety').json({ hash: true })
  t.equal(same[0].hash, json[1].hash, here + 'match')

  const notSame = nlp('food safety').json({ hash: true })
  t.ok(notSame[0].hash !== json[1].hash, here + 'no-match')

  t.end()
})


test('json-out', function (t) {
  const a = nlp('food safety').out('hash')
  const b = nlp('fOOd Safety').out('hash')
  t.equal(a, '88303ab448fe4112e6a2e0aff6eb3ac7', here + 'first one')
  t.equal(b, '8d70d1b26433a7fdc007df91e114d4c9', here + 'capitals one')
  t.ok(a != b, here + 'capitals-change')
  t.end()
})
