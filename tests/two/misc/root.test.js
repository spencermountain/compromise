import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/root] '

test('root text', function (t) {
  let txt = `i've exercised four to five days per week.`
  let doc = nlp(txt).compute('root')
  let want = `i have exercise four to five day per week.`
  t.equal(doc.text('root'), want, here + 'found root form')
  t.end()
})

test('lookup root', function (t) {
  let txt = `i've exercised four to five days per week.`
  let doc = nlp(txt).compute('root')
  let res = doc.lookup(['john lennon', 'exercise', 'four to five'], { form: 'root' })
  t.deepEqual(res.out('array'), ['exercised', 'four to five'], here + 'found root form')
  t.end()
})