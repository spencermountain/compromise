import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/freeze] '

test('freeze-match :', function (t) {
  const doc = nlp(`yeah. one extra two match here three`)
  const m = doc.match('match here')
  // m.freeze()
  doc.remove('extra')
  t.equal(m.text(), 'match here', here + 'match')
  t.end()
})

test('freeze-remove-before :', function (t) {
  const doc = nlp(`yeah. one extra two match here three`)
  const m = doc.match('match here')
  // m.freeze()
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove')
  t.end()
})

test('freeze-remove-after :', function (t) {
  const doc = nlp(`yeah. one two match here extra three`)
  const m = doc.match('match here')
  // m.freeze()
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove-after')
  t.end()
})

test('freeze-destroy-match :', function (t) {
  const doc = nlp(`yeah. one two match extra here three`)
  const m = doc.match('match extra here')
  // m.freeze()
  doc.remove('extra')
  t.equal(m.text(), 'match here', here + 'broken-match')
  // ensure it now removes nothing
  doc.remove(m)
  t.equal(doc.has('match'), false, here + 'removed some')
  t.equal(doc.has('here'), true, here + 'kept some')
  t.end()
})

test('freeze-change-multi :', function (t) {
  const doc = nlp(`extra extra match extra. extra one match two extra. match one`)
  const m = doc.match('match')
  // m.freeze()
  doc.remove('extra')
  t.equal(doc.text(), 'match. one match two. match one', here + 'before remove')
  doc.remove(m)
  t.equal(doc.text(), 'one two. one', here + 'after remove')
  t.end()
})

test('freeze-split :', function (t) {
  const doc = nlp(`e before and m and after`)
  const m = doc.match('m')
  // m.freeze()
  doc.remove('e')
  const res = doc.splitOn(m)
  t.deepEqual(res.out('array'), ['before and', 'm', 'and after'], here + 'freeze split')
  t.end()
})

test('freeze-sentence-remove :', function (t) {
  const doc = nlp(`extra. match`)
  const m = doc.match('match')
  doc.remove('extra')
  t.equal(doc.match(m).text(), 'match', here + 'remove-sentence')
  t.end()
})

test('repair-grandchild :', function (t) {
  const doc = nlp('before. one match yes match no. match nope')
  const m1 = doc.match('match yes match')
  const m2 = m1.match('match yes')
  const m3 = m2.match('yes')
  doc.replace('one', 'so many more words')
  t.equal(m3.text(), 'yes', 'grandchild repaired')
  t.end()
})

test('freeze-misc :', function (t) {
  let doc = nlp('before. one match yes match no. match nope')
  const m = doc.match('match yes')
  doc.prepend('match yes')
  doc.replace('one', 'oh yeah')
  doc.replace('oh yeah', 'foo')
  doc = doc.notIf('before')
  doc.remove('one')
  t.equal(m.text(), 'match yes', 'still repaired')
  t.end()
})
