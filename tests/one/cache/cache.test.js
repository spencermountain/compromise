import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/cache] '

test('no sneaky cache', function (t) {
  const doc = nlp('one two three four')
  t.equal(doc._cache, null, here + 'no-cache')
  doc.match('one two three').tag('#Person')
  t.equal(doc.match('#Person').found, true, here + 'doc is live')
  t.end()
})

test('invalidate cach on tag', function (t) {
  const doc = nlp(`chilly`)
  doc.tag('Noun')
  let res = doc.match('#Noun')
  t.equal(res.found, true, here + 'match skipped cache')
  res = doc.lookup(['farm', 'chilly'])
  t.equal(res.found, true, here + 'lookup skipped cache')
  t.end()
})

test('applied cache is sneaky', function (t) {
  const doc = nlp('one two three four').cache()
  const m = doc.match('one two three')
  m.tag('#Person')//oh neat
  t.equal(m.match('#Person').found, true, here + 'm is updated')
  t.equal(doc.match('#Person').found, false, here + 'parent is out-of-date')
  t.end()
})

test('cache term forms', function (t) {
  const doc = nlp(`spencer's city/town`)
  doc.cache()

  let m = doc.matchOne('spencer')
  t.equal(m.length, 1, here + 'posessive')

  m = doc.match('city')
  t.equal(m.length, 1, here + 'slash')

  m = doc.match('city/town')
  t.equal(m.length, 1, here + 'full-slash')

  t.end()
})


test('cache if method', function (t) {
  const doc = nlp('blah blah. foo foo. blah to your town')
  doc.cache()

  let m = doc.if('to your town')
  t.equal(m.length, 1, here + 'if')

  m = doc.ifNo('to your town')
  t.equal(m.length, 2, here + 'ifNo')
  t.end()
})