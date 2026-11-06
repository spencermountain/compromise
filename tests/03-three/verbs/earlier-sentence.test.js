import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verb-earlier-sentence] '

// rewriting a question must not alter the sentences around it
const question = 'Do the walls really need 5 coats of paint?'
const str = `Dr. Smith wasn't happy about half of it (again).`

// the text of the sentence after our question
const lastSentence = doc => doc.text().split('? ')[1]

test(here + 'verbs: negative survives an earlier question', function (t) {
  const arr = [
    ['toInfinitive', 'Dr. Smith is not happy about half of it (again).'],
    ['toPresentTense', 'Dr. Smith is not happy about half of it (again).'],
    ['toPastTense', `Dr. Smith wasn't happy about half of it (again).`],
    ['toFutureTense', 'Dr. Smith will not be happy about half of it (again).'],
    ['toGerund', 'Dr. Smith is not being happy about half of it (again).'],
    ['toPastParticiple', 'Dr. Smith has not been happy about half of it (again).'],
  ]
  arr.forEach(a => {
    const [method, want] = a
    let doc = nlp(str)
    doc.verbs()[method]()
    t.equal(doc.text(), want, here + 'alone: ' + method)

    doc = nlp(question + ' ' + str)
    doc.verbs()[method]()
    t.equal(lastSentence(doc), want, here + 'after-question: ' + method)
  })
  t.end()
})

test(here + 'sentences: negative survives an earlier question', function (t) {
  const arr = [
    ['toInfinitive', 'Dr. Smith is not happy about half of it (again).'],
    ['toPresentTense', 'Dr. Smith is not happy about half of it (again).'],
    ['toPastTense', `Dr. Smith wasn't happy about half of it (again).`],
    ['toFutureTense', 'Dr. Smith will not be happy about half of it (again).'],
  ]
  arr.forEach(a => {
    const [method, want] = a
    let doc = nlp(str)
    doc.sentences()[method]()
    t.equal(doc.text(), want, here + 'alone: ' + method)

    doc = nlp(question + ' ' + str)
    doc.sentences()[method]()
    t.equal(lastSentence(doc), want, here + 'after-question: ' + method)
  })
  t.end()
})

test(here + 'a sentence before the question is untouched, too', function (t) {
  const doc = nlp(`He wasn't happy. Do the walls need paint?`)
  doc.verbs().toFutureTense()
  t.equal(doc.text(), 'He will not be happy. Will the walls need paint?', here + 'before-question')
  t.end()
})

test(here + 'an unselected sentence keeps its one negative', function (t) {
  const doc = nlp(`He wasn't happy. Do the walls need paint?`)
  doc.sentences().eq(1).toFutureTense()
  t.equal(doc.text('implicit'), 'He was not happy. Will the walls need paint?', here + 'implicit text')
  doc.sentences().eq(0).toFutureTense()
  t.equal(doc.text(), 'He will not be happy. Will the walls need paint?', here + 'converted afterward')
  t.end()
})

test(here + 'a contraction in the question itself stays single', function (t) {
  const doc = nlp(`Isn't he happy? She wasn't here.`)
  doc.verbs().toPastTense()
  t.equal(doc.text('implicit'), 'was not he happy? She was not here.', here + 'one not each')
  t.end()
})
