import test from 'tape'
import nlp from './_lib.js'
const here = '[plugins/payload/tests/payload] '

test(here + 'payload-misc', function (t) {
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

test(here + 'payload-fn', function (t) {
  const doc = nlp('i saw John Lennon, and john smith and bob dylan')
  doc.match('(john|bob|dave) .').addPayload(m => {
    return /john/i.test(m.text()) ? { isjohn: true } : null
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

test(here + 'payload-after-remove', function (t) {
  let doc = nlp('one apple. two pears. three plums.')
  doc.match('(apple|plums)').addPayload(m => ({ fruit: m.text('normal') }))
  t.equal(doc.getPayloads().length, 2, 'before-remove')

  doc.remove('two pears')
  let fruit = doc.getPayloads().map(p => p.val.fruit)
  t.deepEqual(fruit, ['apple', 'plums'], 'after-remove')
  t.equal(doc.match('plums').getPayloads().length, 1, 'plums-still-found')

  doc.match('plums').clearPayloads()
  fruit = doc.getPayloads().map(p => p.val.fruit)
  t.deepEqual(fruit, ['apple'], 'clear-after-remove')

  // removing the payload's own words drops it
  doc = nlp('one apple. two pears. three plums.')
  doc.match('(apple|pears|plums)').addPayload(m => ({ fruit: m.text('normal') }))
  doc.remove('two pears')
  fruit = doc.getPayloads().map(p => p.val.fruit)
  t.deepEqual(fruit, ['apple', 'plums'], 'removed-payload-is-gone')
  t.end()
})
