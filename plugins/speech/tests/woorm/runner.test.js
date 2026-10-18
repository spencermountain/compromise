import test from 'tape'
import nlp from '../_lib.js'
import data from './test-data.js'
const here = '[plugins/speech/tests/worm] '

test(here, function (t) {
  Object.entries(data).forEach(([word, want]) => {
    const doc = nlp(word)
    const count = doc.syllables()[0].length
    t.equal(count, want, word)
  })
  t.end()
})
