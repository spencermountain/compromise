import test from 'tape'
import nlp from '../_lib.js'

test('recover predicates after coordinated names and locative modifiers', t => {
  const cases = [
    ['Alice and Bob walk.', 'Alice and Bob walked.', 'Alice and Bob walk.', 'Alice and Bob will walk.'],
    ['The dogs near the house walk.', 'The dogs near the house walked.', 'The dogs near the house walk.', 'The dogs near the house will walk.'],
    ['The keys on the table are missing.', 'The keys on the table were missing.', 'The keys on the table are missing.', 'The keys on the table will be missing.'],
  ]
  cases.forEach(([input, ...expected]) => {
    for (const selection of ['verbs', 'sentences']) {
      ['toPastTense', 'toPresentTense', 'toFutureTense'].forEach((method, i) => {
        const doc = nlp(input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], selection + '.' + method + ': ' + input)
        doc[selection]()[method]()
        t.equal(doc.text(), expected[i], 'repeated: ' + input)
        const fresh = nlp(expected[i])
        fresh[selection]()[method]()
        t.equal(fresh.text(), expected[i], 'fresh: ' + expected[i])
      })
    }
  })
  t.deepEqual(nlp('The keys on the table are missing.').verbs().subjects().out('array'), ['The keys'], 'locative object is not the subject')
  t.deepEqual(nlp('The dogs near the house walk.').verbs().subjects().out('array'), ['The dogs'], 'near is a subject modifier')
  t.equal(nlp('Alice and Bob Walk').has('#Verb'), false, 'title-cased surname stays a name')
  t.end()
})
