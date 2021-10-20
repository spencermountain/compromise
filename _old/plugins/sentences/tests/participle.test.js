const test = require('tape')
const nlp = require('./_lib')

test('toPast finds participle form', function (t) {
  let doc = nlp('i drive')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'i drove', 'no modal')

  doc = nlp('i really drive')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'i really drove', 'adverb no modal')

  doc = nlp('i should drive')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'i should have driven', 'with should')

  doc = nlp('i really may drive')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'i really may have driven', 'with really may')

  doc = nlp('i could actually drive')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'i could have actually driven', 'with could actually')

  doc = nlp("i seriously couldn't drive")
  doc.sentences().toPastTense()
  t.equal(doc.text(), "i seriously couldn't have driven", 'with adverb + neg')

  // doc = nlp("i seriously couldn't even drive")
  // doc.sentences().toPastTense()
  // t.equal(doc.text(), "i seriously couldn't even have driven", 'with many modals')

  t.end()
})

test('toParticiple', function (t) {
  let arr = [
    ['i drive', 'i have driven'],
    ['we smoke', 'we have smoked'],
    // ['i will go', 'i will have gone'], //hmm
    ['they all swim', 'they all have swam'],
    ['i learn', 'i have learned'],
    ['i really travel to india', 'i really have traveled to india'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.sentences().toParticiple()
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
    ['i really may travel', 'i really may have traveled'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.sentences().toPastTense()
    t.equal(doc.text(), a[1], a[0])
  })
  t.end()
})
