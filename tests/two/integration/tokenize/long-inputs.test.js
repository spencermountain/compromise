import test from 'tape'
import nlp from '../../_lib.js'
const here = '[two/integration/tokenize/long-inputs] '

test(here + 'long rejecting inputs finish', t => {
  t.doesNotThrow(() => nlp('!'.repeat(100000)), 'ASCII punctuation')
  t.doesNotThrow(() => nlp('a'.repeat(100000) + 't'), 'suffix rejection')
  t.doesNotThrow(() => nlp('!'.repeat(100000) + '。'), 'CJK branch')
  t.end()
})
