import test from 'tape'
import nlp from '../../_lib.js'

// Explicit expected sentences: these do not reuse the converter's planner.
const cases = [
  ['she has eaten', 'she had eaten', 'she has eaten', 'she will have eaten'],
  ['they had not eaten', 'they had not eaten', 'they have not eaten', 'they will have not eaten'],
  ['she will not really have eaten', 'she had not really eaten', 'she has not really eaten', 'she will not really have eaten'],
  ['they have been walking', 'they had been walking', 'they have been walking', 'they will have been walking'],
  ['she will not have been walking', 'she had not been walking', 'she has not been walking', 'she will not have been walking'],
  ['she is driven', 'she was driven', 'she is driven', 'she will be driven'],
  ['they were not driven', 'they were not driven', 'they are not driven', 'they will not be driven'],
  ['she will really be driven', 'she had really been driven', 'she is really driven', 'she will really be driven'],
  ['they will be really being driven', 'they were really being driven', 'they are really being driven', 'they will be really being driven'],
  ['she has not been driven', 'she had not been driven', 'she has not been driven', 'she will not have been driven'],
  ['they had been being driven', 'they had been being driven', 'they have been being driven', 'they will have been being driven'],
  ['she has had tea', 'she had had tea', 'she has had tea', 'she will have had tea'],
  ['they will not have had tea', 'they had not had tea', 'they have not had tea', 'they will not have had tea'],
]

test('shared auxiliary converter preserves roots and modifier positions', t => {
  const methods = ['toPastTense', 'toPresentTense', 'toFutureTense']
  cases.forEach(([input, ...expected]) => {
    methods.forEach((method, i) => {
      for (const selection of ['verbs', 'sentences']) {
        const doc = nlp(input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], selection + '.' + method + ': ' + input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], 'repeated: ' + selection + '.' + method + ': ' + input)
        const fresh = nlp(expected[i])
        fresh[selection]()[method]()
        t.equal(fresh.text(), expected[i], 'fresh: ' + selection + '.' + method + ': ' + input)
      }
    })
  })
  t.end()
})

test('private auxiliary model does not change public parse shapes', t => {
  const verbs = nlp('she has really been driven').verbs()
  t.deepEqual(Object.keys(verbs.parse()[0]).sort(),
    ['adverbs', 'auxiliary', 'negative', 'phrasal', 'prefix', 'root'], 'parse fields')
  t.deepEqual(Object.keys(verbs.json()[0].verb).sort(),
    ['auxiliary', 'grammar', 'infinitive', 'negative', 'postAdverbs', 'preAdverbs', 'prefix', 'root'], 'JSON fields')
  t.end()
})

test('auxiliary changes retain punctuation and preserve contractions on no-ops', t => {
  const unchanged = nlp("They've eaten, haven't they?")
  unchanged.verbs(0).toPresentTense()
  t.equal(unchanged.text(), "They've eaten, haven't they?", 'unchanged contraction')
  const doc = nlp("She hasn't eaten.")
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'She had not eaten.', 'expanded contraction and final punctuation')
  const subject = nlp("No part of the insect he'd seen was now visible.")
  subject.sentences().toPresentTense()
  t.equal(subject.text(), 'No part of the insect he has seen is now visible.', 'contracted subject outside verb selection')
  const perfect = nlp('she is really being driven')
  perfect.verbs().toPastParticiple()
  t.equal(perfect.text(), 'she has really been being driven', 'perfect passive with adverb')
  perfect.verbs().toPastParticiple()
  t.equal(perfect.text(), 'she has really been being driven', 'perfect passive repeated')
  t.end()
})
