import test from 'tape'
import splitTerm from '../src/syllables/split/index.js'

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
    const parts = splitTerm({ text })
    t.deepEqual(parts, expected, text)
    t.equal(parts.join(''), text, `${text}: reconstruction`)
  })
  t.end()
})

// An Acronym tag alone does not establish a letter-by-letter pronunciation.
test('speech: acronym tags do not change spelling-based splitting', t => {
  for (const text of ['NASA', 'FBI', 'U.S.A.']) {
    const plain = splitTerm({ text })
    const tagged = splitTerm({ text, tags: new Set(['Acronym']) })
    t.deepEqual(tagged, plain, text)
    t.equal(tagged.join(''), text, `${text}: reconstruction`)
  }
  t.end()
})
