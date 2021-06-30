const test = require('tape')
const nlp = require('../_lib')

//ignore some modals during conjugation, i guess
test('modal-verb conjugation', t => {
  let doc = nlp('he would walk')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he would have walked', 'would-past')

  doc = nlp('he would walk')
  doc.verbs().toFutureTense()
  t.equal(doc.out(), 'he would walk', 'would-future')

  doc = nlp('he would walk')
  doc.verbs().toPresentTense()
  t.equal(doc.out(), 'he walks', 'would-present')

  // str = nlp('he would walk')
  //   .verbs()
  //   .toContinuous()
  //   .out()
  // t.equal(str, 'he is walking', 'would-continuous')

  t.end()
})

// test('ignore-would-behaviour', t => {
//   const doc = nlp(`best look after`).verbs()
//   const out = doc.conjugation()
//   t.equal(doc.length, 1, 'one-verb')
//   t.ok(out, 'no-error')
//   t.end()
// })

//can/could
//might
//should
