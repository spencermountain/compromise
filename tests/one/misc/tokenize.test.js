import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/tokenize] '

test('tokenize dash', function (t) {
  let doc = nlp('re-do and reuse')
  t.ok(doc.has('redo'), here + 're- one word')
  t.ok(doc.has('re-do'), here + 're- dashed word')
  // t.ok(doc.has('re do'), here + 'two words')

  doc = nlp('inter-species communication')
  t.ok(doc.has('interspecies'), here + 'inter one word')
  t.ok(doc.has('inter-species'), here + 'inter dashed word')
  t.ok(doc.has('inter species'), here + 'inter two words')

  doc = nlp('the counter-argument')
  t.ok(doc.has('counterargument'), here + 'counter one word')
  t.ok(doc.has('counter-argument'), here + 'counter dashed word')
  t.ok(doc.has('counter argument'), here + 'counter two words')

  doc = nlp(`additional non-urgent appointment.`)
  let m = doc.match(`additional non? urgent? appointment`)
  t.equal(m.found, true, here + 'non-urgent')
  t.end()
})