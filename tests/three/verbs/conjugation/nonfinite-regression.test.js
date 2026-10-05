import test from 'tape'
import nlp from '../../_lib.js'

test('auxiliary conversion tolerates negation and adverbs', t => {
  const cases = [
    ['she will not have been walking', 'toPastTense', 'she had not been walking'],
    ['they will really have been walking', 'toPastTense', 'they had really been walking'],
    ['they will not be driven', 'toPastTense', 'they had not been driven'],
    ['she will really be driven', 'toPastTense', 'she had really been driven'],
    ['she will not really be driven', 'toPastTense', 'she had not really been driven'],
    ['we were going to swim', 'toFutureTense', 'we are going to swim'],
    ['she was going to be swimming', 'toFutureTense', 'she is going to be swimming'],
    ['I was not going to swim', 'toFutureTense', 'I am not going to swim'],
    ['they were really going to swim', 'toFutureTense', 'they are really going to swim'],
    ['I had eaten', 'toPresentTense', 'I have eaten'],
    ['you had not eaten', 'toPresentTense', 'you have not eaten'],
    ['they had really eaten', 'toPresentTense', 'they have really eaten'],
    ['she had eaten', 'toPresentTense', 'she has eaten'],
  ]
  cases.forEach(([input, method, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]()[method]()
      t.equal(doc.text(), expected, selection + '.' + method + ': ' + input)
    }
  })
  t.end()
})

test('already perfect modal progressives remain unchanged', t => {
  for (const input of [
    'she could have been swimming',
    'they might not have been swimming',
    'she should really have been swimming',
  ]) {
    const doc = nlp(input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), input, input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), input, 'repeated: ' + input)
  }
  t.end()
})

test('prepositional gerunds are not conjugated', t => {
  for (const [input, expected] of [
    ['I am excited by snowboarding.', 'I was excited by snowboarding.'],
    ['she learns by swimming', 'she learned by swimming'],
    ['she learns by quickly swimming', 'she learned by quickly swimming'],
  ]) {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPastTense()
      t.equal(doc.text(), expected, selection + ': ' + input)
    }
  }
  const progressive = nlp('she is swimming')
  progressive.verbs().toPastTense()
  t.equal(progressive.text(), 'she was swimming', 'finite progressive still conjugates')
  t.end()
})
