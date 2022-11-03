import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/sweep] '

test('sweep-not:', function (t) {
  let doc = nlp('The service is fast really')
  let net = nlp.buildNet([{ match: 'is fast .', notIf: 'psych' }])
  let m = doc.match(net)
  t.equal(m.text(), 'is fast really', here + 'no-psych')

  doc = nlp('The service is fast psych')
  net = nlp.buildNet([{ match: 'is fast .', notIf: 'psych' }])
  m = doc.match(net)
  t.equal(m.text(), '', here + 'psych-found')

  doc = nlp('i swim in the lake and walk in the road')
  net = nlp.buildNet([{ match: 'i (swim|walk) in the .', notIf: 'in the (park|lake)' }])
  m = doc.match(net)
  t.equal(m.text(), '', here + 'notIf optional')

  t.end()
})

