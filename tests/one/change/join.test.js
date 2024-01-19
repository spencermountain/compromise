import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/join] '

test('sanity-check case:', function (t) {
  let doc = nlp(`John smith and John Franklin`)
  let m = doc.split('.')
  m = m.joinIf('john', '.')
  t.deepEqual(m.out('array'), ['John smith', 'and', 'John Franklin'], here + 'john+.')
  t.end()
})
