import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/adverb-past] '

test('verb after subject + adverb:', function (t) {
  const arr = [
    ['the walls really needed paint', ['really needed']],
    ['the walls needed paint', ['needed']],
    ['the dogs really walked 5 miles', ['really walked']],
    ['he really needed home', ['really needed']],
    ['they still needed help', ['still needed']],
    ['the storm badly damaged the roof', ['badly damaged']],
    // no verb in a noun-phrase
    ['a much needed rest', []],
  ]
  arr.forEach(function (a) {
    const [str, want] = a
    t.deepEqual(nlp(str).verbs().out('array'), want, here + str)
  })
  t.end()
})

test('conjugate verb after subject + adverb:', function (t) {
  const doc = nlp('the walls really needed paint')
  doc.verbs().toPresentTense()
  t.equal(doc.text(), 'the walls really need paint', here + 'toPresentTense')
  t.end()
})
