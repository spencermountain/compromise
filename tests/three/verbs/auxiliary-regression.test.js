import test from 'tape'
import nlp from '../_lib.js'

test('auxiliary conversions preserve agreement and grammatical forms', t => {
  const cases = [
    ['she is driven', 'toFutureTense', 'she will be driven'],
    ['they are not driven', 'toFutureTense', 'they will not be driven'],
    ['she is being driven', 'toFutureTense', 'she will be being driven'],
    ['she was being driven', 'toFutureTense', 'she will be being driven'],
    ['i could drive', 'toPastTense', 'i could have driven'],
    ['i should eat', 'toPastTense', 'i should have eaten'],
    ['i should not eat', 'toPastTense', 'i should not have eaten'],
    ['they will be walking', 'toPastTense', 'they were walking'],
    ['you will not be walking', 'toPastTense', 'you were not walking'],
    ['I will be walking', 'toPresentTense', 'I am walking'],
    ['they will be walking', 'toPresentTense', 'they are walking'],
    ['you will not be walking', 'toPresentTense', 'you are not walking'],
    ['we are going to be swimming', 'toPastTense', 'we were going to be swimming'],
    ['we are going to be swimming', 'toPastParticiple', 'we have been going to be swimming'],
    ['she has been driven', 'toPastTense', 'she had been driven'],
    ['she has not been driven', 'toPastTense', 'she had not been driven'],
    ['she has been driven', 'toFutureTense', 'she will have been driven'],
    ['they have been driven', 'toFutureTense', 'they will have been driven'],
    ['she did really walk', 'toPastParticiple', 'she has really walked'],
    ['she did not walk', 'toPastParticiple', 'she has not walked'],
    ['they do walk', 'toPastParticiple', 'they have walked'],
    ['they will be walking', 'toPastParticiple', 'they have been walking'],
  ]
  cases.forEach(([input, method, expected]) => {
    const doc = nlp(input)
    doc.verbs()[method]()
    t.equal(doc.text(), expected, method + ': ' + input)
    if (method === 'toPastParticiple') {
      doc.verbs()[method]()
      t.equal(doc.text(), expected, 'repeated perfect: ' + input)
    }
  })
  t.end()
})

test('prepositional including is not conjugated', t => {
  for (const method of ['toPastTense', 'toPresentTense', 'toFutureTense', 'toPastParticiple']) {
    const input = '20 people, including many children'
    const doc = nlp(input)
    t.ok(doc.has('(including && #Preposition)'), 'preposition: ' + method)
    doc.verbs()[method]()
    t.equal(doc.text(), input, 'unchanged: ' + method)
  }
  t.ok(nlp('she is including many children').has('(including && #Gerund)'), 'verbal including preserved')
  t.end()
})
