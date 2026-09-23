import test from 'tape'
import nlp from '../_lib.js'

test('future, modal and perfect auxiliary regressions', t => {
  const cases = [
    ['she will drive', 'toPastParticiple', 'she has driven'],
    ['they will not eat', 'toPastParticiple', 'they have not eaten'],
    ['she will really drive', 'toPastParticiple', 'she has really driven'],
    ['she will walk', 'toPastParticiple', 'she has walked'],
    ['she may drive', 'toPastParticiple', 'she may have driven'],
    ['she can drive', 'toPastParticiple', 'she can have driven'],
    ['they should not eat', 'toPastParticiple', 'they should not have eaten'],
    ['she might really drive', 'toPastParticiple', 'she might really have driven'],
    ['she will not eat', 'toPresentTense', 'she does not eat'],
    ['you will not drive', 'toPresentTense', 'you do not drive'],
    ['they will not really eat', 'toPresentTense', 'they do not really eat'],
    ['we are going to be swimming', 'toPresentTense', 'we are swimming'],
    ['she is not going to be swimming', 'toPresentTense', 'she is not swimming'],
    ['we are going to swim', 'toPresentTense', 'we are swimming'],
    ['they had been walking', 'toPresentTense', 'they have been walking'],
    ['she had not been walking', 'toPresentTense', 'she has not been walking'],
    ['they have been walking', 'toPastTense', 'they had been walking'],
    ['they have not been walking', 'toPastTense', 'they had not been walking'],
    ['they have been walking', 'toFutureTense', 'they will have been walking'],
    ['she will not have eaten', 'toPastTense', 'she had not eaten'],
    ['she will not really have eaten', 'toPastTense', 'she had not really eaten'],
    ['they will really have eaten', 'toPastTense', 'they had really eaten'],
    ['they will not have eaten', 'toPresentTense', 'they have not eaten'],
    ['she will not have eaten', 'toPastParticiple', 'she has not eaten'],
    ['she has been driven', 'toPresentTense', 'she has been driven'],
    ['they have been driven', 'toPresentTense', 'they have been driven'],
    ['they had not been driven', 'toPresentTense', 'they have not been driven'],
    ['they have not been driven', 'toPastTense', 'they had not been driven'],
  ]
  cases.forEach(([input, method, expected]) => {
    const doc = nlp(input)
    doc.verbs()[method]()
    t.equal(doc.text(), expected, method + ': ' + input)
    if (method === 'toPastParticiple') {
      doc.verbs()[method]()
      t.equal(doc.text(), expected, 'repeat perfect: ' + input)
    }
  })
  t.end()
})

test('perfect passive classification is independent of subject number', t => {
  for (const input of ['she has been driven', 'they have been driven']) {
    const grammar = nlp(input).verbs().json()[0].verb.grammar
    t.equal(grammar.form, 'passive-present', input)
    t.equal(grammar.tense, 'PresentTense', 'tense: ' + input)
  }
  t.end()
})

test('including accepts determined and modified noun phrases', t => {
  for (const input of [
    '20 people, including the children',
    '20 people, including very young children',
    '20 people, including all the children',
  ]) {
    const doc = nlp(input)
    t.ok(doc.has('(including && #Preposition)'), input)
    for (const method of ['toPastTense', 'toPresentTense', 'toFutureTense', 'toPastParticiple']) {
      const copy = doc.clone()
      copy.verbs()[method]()
      t.equal(copy.text(), input, 'unchanged: ' + method)
    }
  }
  for (const input of ['she is including the children', 'they are including very young children']) {
    t.ok(nlp(input).has('(including && #Gerund)'), 'verbal: ' + input)
  }
  t.end()
})
