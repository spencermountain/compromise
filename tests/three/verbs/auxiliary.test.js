import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/auxilary] '

test('participle/auxiliary toPast', function (t) {
  // let doc = nlp('i am being driven')
  // doc.verbs().toPastTense()
  // t.equal(doc.text(), 'i was driven', here + 'to-past1')

  let doc = nlp('he has been stalking his prey')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he had been stalking his prey', here + 'to-past2')

  doc = nlp('she bit her tongue instead of criticizing her prom date')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'she bit her tongue instead of criticizing her prom date', here + 'to-past3')

  doc = nlp('he should have been eating')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he should have been eating', here + 'to-past4')

  t.end()
})

//ignore some modals during conjugation, i guess
test('modal-verb conjugation', t => {
  let doc = nlp('he would walk')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'he would have walked', here + 'would-past')

  doc = nlp('he would walk')
  doc.verbs().toFutureTense()
  t.equal(doc.out(), 'he would walk', here + 'would-future')

  // doc = nlp('he would walk')
  // doc.verbs().toPresentTense()
  // t.equal(doc.out(), 'he walks', here + 'would-present')

  // let str = nlp('he would walk').verbs().toGerund().all().out()
  // t.equal(str, 'he is walking', 'would-toGerund')

  t.end()
})