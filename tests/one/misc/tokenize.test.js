import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/tokenize] '

test('dash lookups', function (t) {
  let arr = [
    // supported
    're-purpose',
    'co-opting',
    'mis-information',
    'proto-plasmic',
    // unsupported
    'counter-argument',
    'soft-sell',
    'big-news',
    'do-over',
    'over-the-top',
    'larger-than-life',
    're-zoning-laws',
  ]
  arr.forEach(str => {
    t.ok(nlp(str).has(str), here + '[dash] ' + str)

  })
  t.end()
})



test('supported dash', function (t) {
  let doc = nlp('re-do and reuse')
  t.ok(doc.has('redo'), here + 're- one word')
  t.ok(doc.has('re-do'), here + 're- dashed word')
  // t.ok(doc.has('re do'), here + 'two words')

  doc = nlp('inter-species communication')
  t.ok(doc.has('interspecies'), here + 'inter one word')
  t.ok(doc.has('inter-species'), here + 'inter dashed word')
  // t.ok(doc.has('inter species'), here + 'inter two words')

  // unsupported prefix
  doc = nlp('the counter-argument')
  t.ok(doc.has('counterargument'), here + 'counter one word')
  t.ok(doc.has('counter-argument'), here + 'counter dashed word')
  t.ok(doc.has('counter argument'), here + 'counter two words')

  doc = nlp(`additional non-urgent appointment.`)
  let m = doc.match(`additional non? urgent? appointment`)
  t.equal(m.found, true, here + 'non-urgent')
  t.end()
})