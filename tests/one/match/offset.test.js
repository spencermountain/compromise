import test from 'tape'
import nlp from '../_lib.js'

test('captures and anchors after the first term', t => {
  const doc = nlp('zero one one two tail. zero one two tail.')
  const m = doc.match('[<run>one+] two')
  t.deepEqual(m.out('array'), ['one one two', 'one two'], 'repeated matches in separate sentences')
  t.deepEqual(m.groups('run').out('array'), ['one one', 'one'], 'greedy captures keep their positions')
  t.deepEqual(doc.match('[one .* tail]$').out('array'), ['one one two tail.', 'one two tail.'], 'wildcard capture reaches sentence end')
  t.equal(doc.has('^one'), false, 'start anchor cannot match a later term')
  t.deepEqual(m.match('[<last>two]$').groups('last').out('array'), ['two', 'two'], 'end anchors and captures within partial Views')
  t.equal(doc.eq(1).match('one [two]').groups(0).text(), 'two', 'capture in selected sentence')
  t.end()
})

test('optional, negative, and alternative matches at later positions', t => {
  const doc = nlp('zero one two three tail')
  t.equal(doc.match('one? two [three]').groups(0).text(), 'three', 'optional prefix preserves capture')
  t.equal(doc.match('!one+ three').text(), 'two three', 'negative repetition stops before the following token')
  t.equal(doc.match('(one two|four)+ three').text(), 'one two three', 'multiword alternative at a later position')
  t.equal(nlp("zero we've walked").match("[<subject>we've] walked").groups('subject').text(), "we've", 'contraction capture skips implicit terms')
  t.end()
})

test('notIf scans only the matched span', t => {
  const net = nlp.buildNet([{ match: 'one [.+]', group: 0, notIf: 'two$' }])
  const doc = nlp('zero one two. two one three.')
  t.deepEqual(doc.sweep(net).view.out('array'), ['three.'], 'exclude ending two, not two before the match')
  t.end()
})
