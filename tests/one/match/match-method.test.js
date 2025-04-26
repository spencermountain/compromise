import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/match-method] '

test('match @functions', function (t) {
  let doc = nlp(`jamie's much, much better.`)

  let m = doc.match('@hasComma')
  t.equal(m.text(), 'much', here + 'hasComma')

  m = doc.match('(@hasPeriod|cool)')
  t.equal(m.text(), 'better', here + 'hasPeriod')

  m = doc.match('(@hasSemicolon|better)')
  t.equal(m.text(), 'better', here + 'false-positive')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('!@hasComma')
  t.equal(m.text(), 'i am much better and faster', here + 'negative function')

  doc = nlp(`i am much, much better and faster`)
  m = doc.match('(foo|!@hasComma)')
  t.equal(m.text(), 'i am much better and faster', here + 'negative in optional function')


  m = nlp('set the SCE to AUX.').match('@isUpperCase')
  t.equal(m.length, 2, here + 'two uppercase')

  doc = nlp('Titlecase UPPERCASE notUPPER ÈPPERCASE')
  m = doc.match('@isUpperCase')
  t.equal(m.length, 2, here + 'unicode uppercase')

  doc = nlp('Titlecase UPPERCASE notUPPER Èppercasë')
  m = doc.match('@isTitleCase')
  t.equal(m.length, 2, here + 'unicode titlecase')


  t.end()
})

test('pre-parse match', function (t) {
  const doc = nlp('the weight of the world. foo')
  let reg = 'weight of the? world'
  reg = nlp.parseMatch(reg)
  t.equal(doc.match(reg).found, true, here + 'match')
  t.equal(doc.matchOne(reg).found, true, here + 'matchOne')
  t.equal(doc.if(reg).found, true, here + 'if')
  t.equal(doc.ifNo(reg).found, true, here + 'ifNo')
  t.equal(doc.has(reg), true, here + 'has')
  t.equal(doc.not(reg).text(), 'the foo', here + 'not')
  t.end()
})

test('pre-parse lookaround', function (t) {
  const doc = nlp(`before match after`)
  const m = doc.match('match')

  let reg = nlp.parseMatch('before')
  t.equal(m.before(reg).text(), 'before', here + 'before')

  reg = nlp.parseMatch('after')
  t.equal(m.after(reg).text(), 'after', here + 'after')

  reg = nlp.parseMatch('before')
  t.equal(m.growLeft(reg).text(), 'before match', here + 'growLeft')

  reg = nlp.parseMatch('after')
  t.equal(m.growRight(reg).text(), 'match after', here + 'growRight')

  reg = nlp.parseMatch('after')
  t.equal(m.grow(reg).text(), 'match after', here + 'grow')
  t.end()
})

test('pre-parse split', function (t) {
  const doc = nlp(`before match after`)
  const reg = nlp.parseMatch('match')
  let m = doc.splitOn(reg)
  t.deepEqual(m.out('array'), ['before', 'match', 'after'], here + 'splitOn')

  m = doc.splitBefore(reg)
  t.deepEqual(m.out('array'), ['before', 'match after'], here + 'splitBefore')

  m = doc.splitAfter(reg)
  t.deepEqual(m.out('array'), ['before match', 'after'], here + 'splitAfter')

  t.end()
})
