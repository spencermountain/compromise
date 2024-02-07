import test from 'tape'
import nlp from './_lib.js'

test('payload-misc', function (t) {
  let doc = nlp('i saw John Lennon, and tom cruise.')

  doc.match('(john lennon|tom cruise|johnny carson)').forEach(m => {
    if (m.has('john lennon')) {
      m.addPayload({ height: `5'11` })
    }
    if (m.has('tom cruise')) {
      m.addPayload({ height: `5'8` })
    }
  })

  t.equal(doc.getPayloads().length, 2, 'full-doc-2')

  let end = doc.match('and tom .')
  t.equal(end.getPayloads().length, 1, 'end-1')

  let tom = doc.match('tom')
  t.equal(tom.getPayloads().length, 1, 'tom-0')

  t.end()
})
