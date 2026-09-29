import test from 'tape'
import nlp from '../../_lib.js'

const cases = [
  ['she has eaten and slept', 'she had eaten and slept', 'she has eaten and slept', 'she will have eaten and slept'],
  ['she has slept and eaten', 'she had slept and eaten', 'she has slept and eaten', 'she will have slept and eaten'],
  ['they have eaten and drunk', 'they had eaten and drunk', 'they have eaten and drunk', 'they will have eaten and drunk'],
  ['she has not eaten or slept', 'she had not eaten or slept', 'she has not eaten or slept', 'she will have not eaten or slept'],
  ['she is eating and sleeping', 'she was eating and sleeping', 'she is eating and sleeping', 'she will be eating and sleeping'],
  ['they are eating and sleeping and walking', 'they were eating and sleeping and walking', 'they are eating and sleeping and walking', 'they will be eating and sleeping and walking'],
  ['she is being watched and recorded', 'she was being watched and recorded', 'she is being watched and recorded', 'she will be being watched and recorded'],
  ['she will eat and sleep', 'she ate and slept', 'she eats and sleeps', 'she will eat and sleep'],
  ['they will eat and sleep', 'they ate and slept', 'they eat and sleep', 'they will eat and sleep'],
  ['she has eaten and quietly slept', 'she had eaten and quietly slept', 'she has eaten and quietly slept', 'she will have eaten and quietly slept'],
  ['she ought to eat and sleep', 'she ought to eat and sleep', 'she ought to eat and sleep', 'she ought to eat and sleep'],
  ['she should eat and sleep', 'she should have eaten and slept', 'she should eat and sleep', 'she should eat and sleep'],
  ["She hasn't eaten or slept.", 'She had not eaten or slept.', "She hasn't eaten or slept.", 'She will have not eaten or slept.'],
]

const verify = (t, input, expected, method, selection = 'verbs') => {
  const doc = nlp(input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, selection + '.' + method + ': ' + input)
  doc[selection]()[method]()
  t.equal(doc.text(), expected, 'repeated: ' + input)
  const fresh = nlp(expected)
  fresh[selection]()[method]()
  t.equal(fresh.text(), expected, 'fresh: ' + expected)
}

test('tense conversion preserves shared auxiliaries in coordination', t => {
  const methods = ['toPastTense', 'toPresentTense', 'toFutureTense']
  cases.forEach(([input, ...expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      methods.forEach((method, i) => verify(t, input, expected[i], method, selection))
    }
  })
  t.end()
})

test('coordinated roots follow perfect, progressive and infinitive conversions', t => {
  const rows = [
    ['she has eaten and slept', 'toPastParticiple', 'she has eaten and slept'],
    ['she is eating and sleeping', 'toPastParticiple', 'she has been eating and sleeping'],
    ['she is being watched and recorded', 'toPastParticiple', 'she has been being watched and recorded'],
    ['she will eat and sleep', 'toPastParticiple', 'she has eaten and slept'],
    ['she has eaten and slept', 'toGerund', 'she is eating and sleeping'],
    ['they have eaten and drunk', 'toGerund', 'they are eating and drinking'],
    ['she has not eaten or slept', 'toGerund', 'she is not eating or sleeping'],
    ['she is being watched and recorded', 'toGerund', 'she is being watched and recorded'],
    ['she has eaten and slept', 'toInfinitive', 'she eat and sleep'],
    ['she has not eaten or slept', 'toInfinitive', 'she does not eat or sleep'],
    ['she is being watched and recorded', 'toInfinitive', 'she watch and record'],
  ]
  rows.forEach(([input, method, expected]) => verify(t, input, expected, method))
  t.end()
})

test('shared coordination does not consume independent clauses or auxiliaries', t => {
  verify(t, 'she has eaten and he sleeps', 'she will have eaten and he will sleep', 'toFutureTense')
  verify(t, 'she has eaten and will sleep', 'she will have eaten and will sleep', 'toFutureTense')
  verify(t, 'she has eaten and will sleep', 'she has eaten and sleeps', 'toPresentTense')
  verify(t, 'she is eating and he sleeps', 'she was eating and he slept', 'toPastTense')
  verify(t, 'she is eating but sleeps', 'she was eating but slept', 'toPastTense')
  verify(t, 'she has eaten dinner and slept', 'she will have eaten dinner and will sleep', 'toFutureTense')
  verify(t, 'she has eaten, and slept', 'she will have eaten, and will sleep', 'toFutureTense')
  verify(t, 'she has eaten and sleeps', 'she has eaten and sleeps', 'toPresentTense')
  const selected = nlp('she has eaten and slept')
  selected.verbs(0).toGerund()
  t.equal(selected.text(), 'she is eating and slept', 'explicit selection limits the mutation')
  t.end()
})

test('aspect-preserving conversion paths agree with direct conversion', t => {
  // These paths have equivalent aspect/voice; simple future passive has a
  // documented past-perfect compatibility rule and is intentionally excluded.
  const rows = [
    ['she has eaten and slept', 'she will have eaten and slept'],
    ['they have eaten and drunk', 'they will have eaten and drunk'],
    ['she is eating and sleeping', 'she will be eating and sleeping'],
    ['she is being watched and recorded', 'she will be being watched and recorded'],
  ]
  rows.forEach(([input, expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPastTense()
      doc[selection]().toFutureTense()
      t.equal(doc.text(), expected, 'past → future: ' + selection + ': ' + input)
      const direct = nlp(input)
      direct[selection]().toFutureTense()
      t.equal(direct.text(), expected, 'direct future: ' + selection + ': ' + input)
    }
  })
  t.end()
})
