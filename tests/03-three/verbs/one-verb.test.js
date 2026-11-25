import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/one-verb] '

// verbs(n) changes only the verb that was selected, even when that breaks the sentence.
// sentences() is the way to change every verb together.
test(here + 'a single selected verb', t => {
  const rows = [
    // [input, n, method, expected]
    // a question splits its verb in two
    ['does he walk?', 0, 'toPastTense', 'did he walk?'],
    ['does he walk?', 1, 'toPastTense', 'does he walked?'],
    ['where do they live?', 0, 'toPastTense', 'where did they live?'],
    ['has he left?', 0, 'toPastTense', 'had he left?'],
    ['were the dogs barking?', 0, 'toPresentTense', 'are the dogs barking?'],
    // joined verbs
    ['he will walk and talk', 0, 'toPastTense', 'he walked and talk'],
    ['she has eaten and slept', 0, 'toGerund', 'she is eating and slept'],
    ['he walks and talks', 0, 'toPastTense', 'he walked and talks'],
    ['he walks and talks', 1, 'toPastTense', 'he walks and talked'],
    // other sentences, and clauses
    ['he walks. she runs.', 0, 'toPastTense', 'he walked. she runs.'],
    ['when he walks, she runs', 1, 'toPastTense', 'when he walks, she ran'],
  ]
  rows.forEach(([str, n, method, want]) => {
    const doc = nlp(str)
    doc.verbs(n)[method]()
    t.equal(doc.text(), want, here + `verbs(${n}).${method}: ${str}`)
  })
  t.end()
})

test(here + 'every verb, together', t => {
  const rows = [
    ['does he walk?', 'toPastTense', 'did he walk?'],
    ['does he walk?', 'toFutureTense', 'will he walk?'],
    ['he will walk and talk', 'toPastTense', 'he walked and talked'],
    ['Has she eaten and slept?', 'toGerund', 'Is she eating and sleeping?'],
  ]
  rows.forEach(([str, method, want]) => {
    const doc = nlp(str)
    doc.verbs()[method]()
    t.equal(doc.text(), want, here + `verbs().${method}: ${str}`)
  })
  t.end()
})
