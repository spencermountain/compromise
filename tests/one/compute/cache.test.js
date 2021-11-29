import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/cache] '

test('invalidate cach on tag', function (t) {
  let doc = nlp(`chilly`)
  doc.tag('Noun')
  let res = doc.match('#Noun')
  t.equal(res.found, true, here + 'match skipped cache')

  res = doc.lookup(['farm', 'chilly'])
  t.equal(res.found, true, here + 'lookup skipped cache')

  t.end()
})