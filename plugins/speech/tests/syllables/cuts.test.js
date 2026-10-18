import test from 'tape'
import nlp from '../_lib.js'

// Every cut must preserve the remainder, including the original suffix and casing.
test('speech: cuts retain the final chunk', t => {
  const examples = [
    ['People', ['Peo', 'ple']],
    ['TABLE', ['TA', 'BLE']],
    ['boat', ['boat']],
    ["horse's", ['horse', "'s"]],
    ['horse’s', ['horse', '’s']],
    ["people's", ['peo', "ple's"]],
    ['people’s', ['peo', 'ple’s']],
    ["science's", ['sci', 'ence', "'s"]],
    ['science’s', ['sci', 'ence', '’s']],
  ]
  examples.forEach(([text, expected]) => {
    const parts = nlp(text).syllables()[0]
    t.deepEqual(parts, expected, text)
    t.equal(parts.join(''), text, `${text}: reconstruction`)
  })
  t.end()
})
