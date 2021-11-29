import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/cache] '

test('no sneaky cache', function (t) {
  let doc = nlp('one two three four')
  t.equal(doc._cache, null, here + 'no-cache')
  doc.match('one two three').tag('#Person')
  t.equal(doc.match('#Person').found, true, here + 'doc is live')
  t.end()
})

test('invalidate cach on tag', function (t) {
  let doc = nlp(`chilly`)
  doc.tag('Noun')
  let res = doc.match('#Noun')
  t.equal(res.found, true, here + 'match skipped cache')
  res = doc.lookup(['farm', 'chilly'])
  t.equal(res.found, true, here + 'lookup skipped cache')
  t.end()
})

test('applied cache is sneaky', function (t) {
  let doc = nlp('one two three four').cache()
  let m = doc.match('one two three')
  m.tag('#Person')//oh neat
  t.equal(m.match('#Person').found, true, here + 'm is updated')
  t.equal(doc.match('#Person').found, false, here + 'parent is out-of-date')
  t.end()
})
