import test from 'tape'
import nlp from '../_lib.js'

test('passive past tense agrees with the subject', t => {
  const cases = [
    ['i am being driven', 'i was being driven'],
    ['we are being driven', 'we were being driven'],
    ['you are driven', 'you were driven'],
    ['they are not being driven', 'they were not being driven'],
    ['she is being driven', 'she was being driven'],
    ['the cars are driven', 'the cars were driven'],
    ['i should be driven', 'i should have been driven'],
    ['i should have been driven', 'i should have been driven'],
    ['I am not driven.', 'I was not driven.'],
    ['you are being driven', 'you were being driven'],
    ['the car is driven', 'the car was driven'],
    ['the cars are not driven', 'the cars were not driven'],
    ['they were being driven', 'they were being driven'],
    ['she is really being driven', 'she was really being driven'],
    ['she must be driven', 'she must have been driven'],
    ['she could be driven', 'she could have been driven'],
    ['she would be driven', 'she would have been driven'],
    ['we are being taken', 'we were being taken'],
    ['she is being seen', 'she was being seen'],
  ]
  cases.forEach(([input, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPastTense()
      t.equal(doc.text(), expected, selection + ': ' + input)
      doc[selection]().toPastTense()
      t.equal(doc.text(), expected, selection + ' repeated: ' + input)
    }
  })
  t.end()
})

test('perfect conversion preserves passive voice and aspect', t => {
  const cases = [
    ['i am being driven', 'i have been being driven'],
    ['she is driven', 'she has been driven'],
    ['we are not being driven', 'we have not been being driven'],
    ['i was driven', 'i have been driven'],
    ['i should be driven', 'i should have been driven'],
    ['i should not be driven', 'i should not have been driven'],
    ['i should have been driven', 'i should have been driven'],
    ['i have been driven', 'i have been driven'],
    ['she has been driven', 'she has been driven'],
    ['she will be driven', 'she has been driven'],
    ['she will not be driven', 'she has not been driven'],
    ['she will have been driven', 'she has been driven'],
    ['I am not driven.', 'I have not been driven.'],
    ['you are being driven', 'you have been being driven'],
    ['the car is driven', 'the car has been driven'],
    ['the cars are not driven', 'the cars have not been driven'],
    ['they were being driven', 'they have been being driven'],
    ['she is really being driven', 'she has really been being driven'],
    ['she must be driven', 'she must have been driven'],
    ['she could be driven', 'she could have been driven'],
    ['she would be driven', 'she would have been driven'],
    ['they have not been driven', 'they have not been driven'],
    ['she had been driven', 'she had been driven'],
    ['she will not have been driven', 'she has not been driven'],
    ['they will be being driven', 'they have been being driven'],
    ['we are being taken', 'we have been being taken'],
    ['she is being seen', 'she has been being seen'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, 'idempotent: ' + input)
  })
  t.end()
})

test('remaining passive conversion bugs', { todo: true }, t => {
  // Assert the intended English, rather than preserving the malformed output.
  const watched = nlp('we are not being watched')
  watched.verbs().toPastParticiple()
  t.equal(watched.text(), 'we have not been being watched', 'negative regular passive')

  const progressive = nlp('they will be being driven')
  progressive.verbs().toPastTense()
  t.equal(progressive.text(), 'they were being driven', 'future passive retains progressive aspect')
  t.end()
})
