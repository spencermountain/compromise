const test = require('tape')
const nlp = require('./_lib')

test('slashes-basic', function (t) {
  let doc = nlp(`spencer is/was trying.`)
  t.equal(doc.terms().length, 3, 'three terms')
  t.equal(doc.match('#Person #Verb trying').found, true, 'verb trying')
  // t.equal(doc.match('#Person is trying').found, true, 'is trying')
  t.end()
})

test('slashes-complex', function (t) {
  // doc = nlp(`spencer is/was trying`)
  // 1. doc.has('#PresentTense') == true (choose first)
  // 2. doc.has('#Verb') (only common tags)
  // 3. doc.has('#PastTense') && doc.has('#PresentTense') :/

  // doc = nlp(`spencer is/was trying`)
  // 1b. doc.has('is') == true (choose first)
  // 2b. doc.has('was') == true  (find both)
  // 3b. doc.has('is') == false  (find none)
  t.end()
})
