import test from 'tape'
import nlp from '../lib.js'
const here = '[three/verbs/agree-option] '

// change the first verb only, with the healing on (default) and then off
const first = (str, method, opts) => {
  const doc = nlp(str)
  doc.verbs(0)[method](opts)
  return doc.text()
}

test(here + 'a verb that shares our helper changes too', t => {
  const rows = [
    // [input, method, default, agree:false]
    ['he will walk and talk', 'toPastTense', 'he walked and talked', 'he walked and talk'],
    ['she has eaten and slept', 'toGerund', 'she is eating and sleeping', 'she is eating and slept'],
    // a verb with its own tense is left alone, either way
    ['he walks and talks', 'toPastTense', 'he walked and talks', 'he walked and talks'],
    ['he walks. she runs.', 'toPastTense', 'he walked. she runs.', 'he walked. she runs.'],
    ['when he walks, she runs', 'toPastTense', 'when he walked, she runs', 'when he walked, she runs'],
    // a 'not' already covers both verbs
    ['they can sing and dance', 'toNegative', 'they can not sing and dance', 'they can not sing and dance'],
  ]
  rows.forEach(([str, method, on, off]) => {
    t.equal(first(str, method), on, here + '[on] ' + str)
    t.equal(first(str, method, { agree: false }), off, here + '[off] ' + str)
  })
  t.end()
})

test(here + 'the option does not change a full selection', t => {
  const rows = [
    ['he will walk and talk', 'toPastTense', 'he walked and talked'],
    ['does he walk?', 'toPastTense', 'did he walk?'],
    ['is he here?', 'toFutureTense', 'will he be here?'],
    ['he walks and talks', 'toNegative', 'he does not walk and does not talk'],
    ['he does not walk', 'toPositive', 'he walks'],
  ]
  rows.forEach(([str, method, want]) => {
    ;[undefined, { agree: false }].forEach(opts => {
      const doc = nlp(str)
      doc.verbs()[method](opts)
      t.equal(doc.text(), want, here + (opts ? '[off] ' : '[on] ') + str)
    })
  })
  t.end()
})
