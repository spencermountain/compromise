import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[three/participle] '

test('toParticiple', function (t) {
  const arr = [
    ['i drive', 'i have driven'],
    ['we smoke', 'we have smoked'],
    // ['i will go', 'i will have gone'], //still future-tense?
    ['they all swim', 'they all have swam'],
    ['i learn', 'i have learned'],
    ['i really travel to india', 'i really have traveled to india'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    // doc.verbs().toParticiple()
    doc.verbs().toPast()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})

test('participle -> past', function (t) {
  const arr = [
    ['i am being driven', 'i have been driven'],
    ['i should be driven', 'i should have been driven'],
    ['i should go', 'i should have gone'],
    ['i should have been driven', 'i should have been driven'],
    ['i have driven', 'i drove'],
    // ['we have smoked', 'we smoked'],
    ['i will have gone', 'i had gone'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.verbs().toPastTense()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})

test('participle -> future', function (t) {
  const arr = [
    // ['i am being driven', 'i will have been driven'],
    // ['i should be driven', 'i should have been driven'],
    // ['i should go', 'i should have gone'],
    // ['i should have been driven', 'i should have been driven'],
    ['i have driven', 'i will drive'],
    ['we have smoked', 'we will smoke'],
    ['i will have gone', 'i will have gone'],
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    doc.verbs().toFutureTense()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})
