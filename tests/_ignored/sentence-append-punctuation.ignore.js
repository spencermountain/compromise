import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[ignored/sentence-append-punctuation] '

// Deferred: Appending sentence text does not replace the existing terminal punctuation as expected here.
test(here + 'sentence append - change', function (t) {
  let doc = nlp('i am cool. it is raining!')
  doc.sentences().append('right?')
  t.equal(doc.text(), 'i am cool right? it is raining right?', 'change ending')

  doc = nlp('it is cool? it is raining?')
  doc.sentences(0).append('for sure.  ')
  t.equal(doc.all().text(), 'it is cool for sure.   it is raining?', 'change ending 2')
  t.end()
})
