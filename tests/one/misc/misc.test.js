import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/misc] '

test('lazy-pointer-issue', function (t) {
  let doc = nlp.tokenize(`four two five`)
  let m = doc.eq(0).match('two')
  t.equal(m.text(), 'two', here + 'convert to full-pointer')
  t.end()
})
