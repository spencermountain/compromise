import test from 'tape'
import nlp from './_lib.js'
const here = '[three/sweep-tag] '

test('cache-one:', function (t) {
  let matches = [
    { match: '(he|she|they|#Noun) (has|have) (a|an)' }
  ]
  let net = nlp.buildNet(matches)
  let doc = nlp(`you have a appointment`)
  t.equal(doc.has(net), true, here + 'Noun cache')
  t.end()
})