const test = require('tape')
const nlp = require('./_lib')

test('toParticiple', function (t) {
  let arr = [
    ['i drive', 'i have driven'],
    ['we smoke', 'we have smoked'],
    ['i will go', 'i have gone'],
    ['they all swim', 'they all have swam'],
    ['i learn', 'i have learned'],
    ['i really travel to india', 'i really have travelled to india'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.sentences().toParticiple().debug()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})

test('modal-present-to-past', function (t) {
  let arr = [
    ['he may drive', 'he may have driven'],
    ['he should smoke', 'he should have smoked'],
    ['i could go', 'i could have gone'],
    ['nobody can swim', 'nobody could have swam'],
    ['i must learn', 'i must have learned'],
    ['i really may travel to india', 'i really may have travelled to india'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.sentences().toPastTense().debug()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
