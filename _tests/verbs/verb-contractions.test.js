const test = require('tape')
const nlp = require('../_lib')

test('conjugate-contractions:', t => {
  let arr = [
    [`i'm good`, 'i was good'],
    [`they're good`, 'they were good'],
    //TODO: missing auxillary
    [`we've said`, 'we said'], //or 'we have said'
    [`they'd said`, 'they said'], //or 'they have said'
    // (ambiguous)
    [`he's good`, 'he was good'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.out(), a[1], a[1])
  })
  t.end()
})
