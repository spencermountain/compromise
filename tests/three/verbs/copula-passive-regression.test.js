import test from 'tape'
import nlp from '../_lib.js'

test('copula and future passive conversions retain agreement and aspect', t => {
  for (const [subject, present, past, perfect] of [
    ['I', 'am', 'was', 'have'],
    ['she', 'is', 'was', 'has'],
    ['they', 'are', 'were', 'have'],
    ['you', 'are', 'were', 'have'],
  ]) {
    for (const negative of ['', 'not ']) {
      const cases = [
        [`${subject} will ${negative}be happy`, 'toPastTense', `${subject} ${past} ${negative}happy`],
        [`${subject} will ${negative}be driven`, 'toPresentTense', `${subject} ${present} ${negative}driven`],
        [`${subject} will ${negative}be being driven`, 'toPresentTense', `${subject} ${present} ${negative}being driven`],
        [`${subject} will ${negative}have been driven`, 'toPresentTense', `${subject} ${perfect} ${negative}been driven`],
        [`${subject} will ${negative}have been driven`, 'toPastTense', `${subject} had ${negative}been driven`],
        [`${subject} ${past} ${negative}going to be swimming`, 'toPresentTense', `${subject} ${present} ${negative}swimming`],
        [`${subject} ${past} ${negative}going to swim`, 'toPastParticiple', `${subject} ${perfect} ${negative}been going to swim`],
      ]
      cases.forEach(([input, method, expected]) => {
        const doc = nlp(input)
        doc.verbs()[method]()
        t.equal(doc.text(), expected, method + ': ' + input)
      })
    }
  }
  t.end()
})

test('negative copula round trips retain auxiliary order', t => {
  for (const input of ['she will not be happy', 'they will not be happy']) {
    const doc = nlp(input)
    doc.verbs().toPastTense()
    doc.verbs().toFutureTense()
    t.equal(doc.text(), input, input)
  }
  for (const [input, method, expected] of [
    ['they will not really be happy', 'toPastTense', 'they were not really happy'],
    ['they will really be driven', 'toPresentTense', 'they are really driven'],
    ['she will not really have been driven', 'toPresentTense', 'she has not really been driven'],
    ['she will not really have been driven', 'toPastTense', 'she had not really been driven'],
  ]) {
    const doc = nlp(input)
    doc.verbs()[method]()
    t.equal(doc.text(), expected, method + ': ' + input)
  }
  t.end()
})

test('off white preserves the copula, including without a hyphen', t => {
  for (const colour of ['off white', 'off-white']) {
    const input = 'the wall is ' + colour
    const doc = nlp(input)
    t.ok(doc.has('(is && #Copula)'), 'copula: ' + colour)
    t.notOk(doc.has('#PhrasalVerb'), 'no phrasal verb: ' + colour)
    doc.verbs().toPastTense()
    t.equal(doc.text(), 'the wall was ' + colour, 'past: ' + colour)
  }
  t.ok(nlp('the light is off').has('#PhrasalVerb'), 'ordinary is off is preserved')
  t.end()
})

test('numeric including phrases are not conjugated', t => {
  for (const quantity of ['two', '2', 'twenty five']) {
    const input = `20 people, including ${quantity} children`
    const doc = nlp(input)
    t.ok(doc.has('(including && #Preposition)'), input)
    doc.verbs().toPastTense()
    t.equal(doc.text(), input, 'unchanged: ' + input)
  }
  t.ok(nlp('she is including two children').has('(including && #Gerund)'), 'verbal including')
  t.end()
})
