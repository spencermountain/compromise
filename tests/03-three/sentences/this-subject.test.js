import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentences/this-subject] '

test(here + 'this subjects survive tense conversion', t => {
  const doc = nlp('this is one sentence. This makes two now.')
  doc.sentences().toPastTense()
  t.equal(doc.text(), 'this was one sentence. This made two now.', 'past')
  doc.sentences().toFutureTense()
  t.equal(doc.text(), 'this will be one sentence. This will make two now.', 'future')
  doc.sentences().toPresentTense()
  t.equal(doc.text(), 'this is one sentence. This makes two now.', 'present round trip')
  t.end()
})
