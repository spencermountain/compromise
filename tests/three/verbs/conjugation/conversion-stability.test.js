import test from 'tape'
import nlp from '../../_lib.js'

test('coordinated prepositional gerunds are protected', t => {
  for (const phrase of ['swimming and diving', 'swimming or diving', 'swimming and diving and surfing', 'swimming and carefully diving']) {
    const doc = nlp('she learns by ' + phrase)
    doc.verbs().toPastTense()
    t.equal(doc.text(), 'she learned by ' + phrase, phrase)
  }
  const finite = nlp('she learns by swimming and is diving')
  finite.verbs().toPastTense()
  t.equal(finite.text(), 'she learned by swimming and was diving', 'finite coordinated clause still converts')
  t.end()
})

test('passive conversion is stable across adverb positions', t => {
  for (const [input, expected] of [
    ['she will really be being driven', 'she was really being driven'],
    ['she will be really being driven', 'she was really being driven'],
    ['she will be being really driven', 'she was being really driven'],
    ['they will not be really being driven', 'they were not really being driven'],
  ]) {
    const doc = nlp(input)
    doc.verbs().toPastTense()
    t.equal(doc.text(), expected, input)
    doc.verbs().toPastTense()
    t.equal(doc.text(), expected, 'repeated: ' + input)
  }
  t.end()
})

test('negative copula perfect conversion preserves auxiliary order', t => {
  for (const [input, expected] of [
    ['she is not happy', 'she has not been happy'],
    ['they were not happy', 'they have not been happy'],
    ['I am really not happy', 'I have really not been happy'],
  ]) {
    const doc = nlp(input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, input)
    doc.verbs().toPastParticiple()
    t.equal(doc.text(), expected, 'repeated: ' + input)
  }
  t.end()
})

test('present conversion preserves perfect aspect on repeated calls', t => {
  for (const [input, expected] of [
    ['she had eaten', 'she has eaten'],
    ['they had not eaten', 'they have not eaten'],
    ['she has really eaten', 'she has really eaten'],
    ['she will have really eaten', 'she has really eaten'],
    ['they had been walking', 'they have been walking'],
    ['she had been driven', 'she has been driven'],
    ["they've seen", "they've seen"],
  ]) {
    for (const selection of ['verbs', 'sentences']) {
      const doc = nlp(input)
      doc[selection]().toPresentTense()
      t.equal(doc.text(), expected, selection + ': ' + input)
      doc[selection]().toPresentTense()
      t.equal(doc.text(), expected, selection + ' repeated: ' + input)
    }
  }
  t.end()
})
