import test from 'tape'
import nlp from './_lib.js'

test('payload-misc', function (t) {
  const doc = nlp('i saw John Lennon, and tom cruise.')

  doc.match('(john lennon|tom cruise|johnny carson)').forEach(m => {
    if (m.has('john lennon')) {
      m.addPayload({ height: `5'11` })
    }
    if (m.has('tom cruise')) {
      m.addPayload({ height: `5'8` })
    }
  })

  t.equal(doc.getPayloads().length, 2, 'full-doc-2')

  const end = doc.match('and tom .')
  t.equal(end.getPayloads().length, 1, 'end-1')

  const tom = doc.match('tom')
  t.equal(tom.getPayloads().length, 1, 'tom-0')

  tom.clearPayloads()
  t.equal(doc.getPayloads().length, 1, 'now-1')
  doc.clearPayloads()
  t.equal(doc.getPayloads().length, 0, 'now-0')

  t.end()
})

test('payload-fn', function (t) {
  const doc = nlp('i saw John Lennon, and john smith and bob dylan')
  doc.match('(john|bob|dave) .').addPayload(m => {
    return m.text().match(/john/i) ? { isjohn: true } : null
  })
  t.equal(doc.getPayloads().length, 2, 'now-2')
  t.equal(doc.match('john .').getPayloads().length, 2, 'double-match-still-2')

  doc.match('bob .').clearPayloads()
  t.equal(doc.getPayloads().length, 2, 'still-2')

  doc.match('john .').eq(1).clearPayloads()
  t.equal(doc.getPayloads().length, 1, 'now-1')
  doc.match('john .').clearPayloads()
  t.equal(doc.getPayloads().length, 0, 'now-0')

  // add two-payloads per match
  doc.match('(john|bob|dave) .').addPayload(m => {
    return { lastName: m.terms().last().text() }
  })
  t.equal(doc.getPayloads().length, 3, '3-now')

  doc.match('(john lennon|bob dylan)').addPayload(() => {
    return { instrument: 'guitar' }
  })
  t.equal(doc.getPayloads().length, 5, '5-now')
  t.end()
})
