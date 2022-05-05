import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/if] '

test('if-basic:', function (t) {
  let r = nlp('spencer is here')
  let m = r.if('asdf')
  t.equal(m.out('text'), '', here + 'if-negative')

  m = r.if('spencer')
  t.equal(m.out('text'), 'spencer is here', here + 'if-positive')

  r = nlp('spencer is here. john was here.')
  m = r.if('is')
  t.equal(m.out('normal'), 'spencer is here.', here + 'if-partial')

  t.end()
})

test('ifNo:', function (t) {
  let r = nlp('spencer is here')
  let m = r.ifNo('spencer')
  t.equal(m.out('text'), '', here + 'ifNo-positive')

  m = r.ifNo('asdf')
  t.equal(m.out('text'), 'spencer is here', here + 'ifNo-negative')

  r = nlp('spencer is here. john was here.')
  m = r.ifNo('is')
  t.equal(m.out('normal'), 'john was here.', here + 'if-no-partial')


  let doc = nlp(`a desire to engage and build`)
  m = doc.match('build')
  m = m.notIf('lkajsdf')
  t.equal(m.out('text'), 'build', here + 'ifNo-miss')

  m = m.notIf('build')
  t.equal(m.out('text'), '', here + 'ifNo-hit')

  doc = nlp('spencer is here. one two')
  m = doc.ifNo('.')
  t.equal(m.out('text'), '', here + 'ifNo-dot')

  doc = nlp('here one mid two end').terms()
  m = doc.ifNo('(one|two)')
  t.equal(m.out('text'), 'here mid end', here + 'ifNo-two')

  t.end()
})

test('if view:', function (t) {
  let doc = nlp('one match two. Two match three match. four nope.')
  let found = doc.match('match+')
  doc = doc.if(found)
  t.equal(doc.text(), 'one match two. Two match three match.', 'if-multi')
  t.end()
})



test('ifNo view:', function (t) {
  let doc = nlp('here one mid two end').terms()
  let m = doc.match('(one|two)')
  let res = doc.ifNo(m)
  t.equal(res.out('text'), 'here mid end', here + 'ifNo-view')


  doc = nlp(`he was john c reilly. oh yeah`)
  m = doc.match('john . reilly')
  res = doc.ifNo(m)
  t.equal(res.text(), 'oh yeah', here + 'ifNo-full')

  t.end()
})
