const test = require('tape')
const nlp = require('../_lib')

test('toParticiple', function (t) {
  let arr = [
    ['i drive', 'i have driven'],
    ['we smoke', 'we have smoked'],
    // ['i will go', 'i will have gone'], //still future-tense?
    ['they all swim', 'they all have swam'],
    ['i learn', 'i have learned'],
    ['i really travel to india', 'i really have traveled to india'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toParticiple()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test('participle -> past', function (t) {
  let arr = [
    ['i am being driven', 'i have been driven'],
    ['i should be driven', 'i should have been driven'],
    ['i should go', 'i should have gone'],
    ['i should have been driven', 'i should have been driven'],
    ['i have driven', 'i drove'],
    ['we have smoked', 'we smoked'],
    ['i will have gone', 'i had gone'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test('participle -> future', function (t) {
  let arr = [
    // ['i am being driven', 'i will have been driven'],
    // ['i should be driven', 'i should have been driven'],
    // ['i should go', 'i should have gone'],
    // ['i should have been driven', 'i should have been driven'],
    ['i have driven', 'i will drive'],
    ['we have smoked', 'we will smoke'],
    ['i will have gone', 'i will have gone'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toFutureTense()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
