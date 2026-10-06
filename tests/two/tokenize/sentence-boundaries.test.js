import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/tokenize/sentence-boundaries] '

test(here + 'two/tokenize/sentence-boundaries: sentence boundary preservation', t => {
  const cases = [
    ['Hello!!! Next?', ['Hello!!!', 'Next?']],
    ['「行きません。」と言った', ['「行きません。」と言った']],
    ['「はい。」「いいえ。」', ['「はい。」', '「いいえ。」']],
    ['a\r\nb\rc\n', ['a', 'b', 'c']],
    ['。 。）。 ', ['。 。）。']],
    ['a。!?b', ['a。', '!?b']],
  ]
  for (const [text, expected] of cases) {
    const doc = nlp(text)
    t.deepEqual(doc.out('array'), expected, text)
    t.equal(doc.text(), text, 'sentence splitting preserves original whitespace')
  }
  t.end()
})
