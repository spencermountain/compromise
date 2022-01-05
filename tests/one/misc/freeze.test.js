import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/freeze] '

test('freeze-match :', function (t) {
  let doc = nlp(`yeah. one extra two match here three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  m.repair()
  t.equal(m.text(), 'match here', here + 'match')
  t.end()
})

test('freeze-remove-before :', function (t) {
  let doc = nlp(`yeah. one extra two match here three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  m.repair()
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove')
  t.end()
})

test('freeze-remove-after :', function (t) {
  let doc = nlp(`yeah. one two match here extra three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  m.repair()
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove-after')
  t.end()
})

test('freeze-destroy-match :', function (t) {
  let doc = nlp(`yeah. one two match extra here three`)
  let m = doc.match('match extra here')
  m.freeze()
  doc.remove('extra')
  m.repair()
  t.equal(m.text(), 'match', here + 'broken-match')
  // ensure it now removes nothing
  doc.remove(m)
  t.equal(doc.has('match'), false, here + 'removed some')
  t.equal(doc.has('here'), true, here + 'kept some')
  t.end()
})

test('freeze-change-multi :', function (t) {
  let doc = nlp(`extra extra match extra. extra one match two extra. match one`)
  let m = doc.match('match')
  m.freeze()
  doc.remove('extra')
  m.repair()
  t.equal(doc.text(), 'match. one match two. match one', here + 'before remove')
  doc.remove(m)
  t.equal(doc.text(), 'one two. one', here + 'after remove')
  t.end()
})

test('freeze-split :', function (t) {
  let doc = nlp(`e before and m and after`)
  let m = doc.match('m')
  m.freeze()
  doc.remove('e')
  m.repair()
  let res = doc.splitOn(m)
  t.deepEqual(res.out('array'), ['before and', 'm', 'and after'], here + 'freeze split')
  t.end()
})

test('freeze-sentence-remove :', function (t) {
  let doc = nlp(`extra. match`)
  let m = doc.match('match').freeze()
  doc.remove('extra')
  m.repair()
  t.equal(doc.match(m).text(), 'match', here + 'remove-sentence')
  t.end()
})

test('repair-grandchild :', function (t) {
  let doc = nlp('before. one match yes match no. match nope')
  let m1 = doc.match('match yes match')
  let m2 = m1.match('match yes')
  let m3 = m2.match('yes').freeze()
  doc.replace('one', 'so many more words')
  m3.repair()
  t.equal(m3.text(), 'yes', 'grandchild repaired')
  t.end()
})

test('freeze-misc :', function (t) {
  let doc = nlp('before. one match yes match no. match nope')
  let m = doc.match('match yes').freeze()
  doc.prepend('match yes')
  doc.replace('one', 'oh yeah')
  m.repair()
  doc.replace('oh yeah', 'foo')
  doc = doc.notIf('before')
  doc.remove('one')
  m.repair()
  t.equal(m.text(), 'match yes', 'still repaired')
  t.end()
})