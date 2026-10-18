import test from 'tape'
import nlp from './_lib.js'
import splitTerm from '../src/syllables/split/index.js'

test('speech: punctuation preserves word spelling', t => {
  // Include straight/curly apostrophes and repeated separators without losing text.
  const examples = [
    ['“People!”', ['“Peo', 'ple!”']],
    ['#People', ['#Peo', 'ple']],
    ['@People', ['@Peo', 'ple']],
    ['re-enter', ['re-', 'en', 'ter']],
    ['foo/bar', ['foo/', 'bar']],
    ['boat--table', ['boat--', 'ta', 'ble']],
    ['boat—table', ['boat—', 'ta', 'ble']],
    ['boat table', ['boat ', 'ta', 'ble']],
    ["people's", ['peo', "ple's"]],
    ['People’s', ['Peo', 'ple’s']],
    ["we're", ["we're"]],
    ['they’ve', ['they’ve']],
    ["don't", ["don't"]],
    ['don’t', ['don’t']],
    ["dogs'", ["dogs'"]],
    ['#People’s!', ['#Peo', 'ple’s!']],
    ['(boat)/[table]', ['(boat)/[', 'ta', 'ble]']],
  ]
  examples.forEach(([text, expected]) => {
    const parts = splitTerm({ text })
    t.deepEqual(parts, expected, text)
    t.equal(parts.join(''), text, `${text}: reconstruction`)
    t.ok(parts.every(part => /[\p{L}\p{N}]/u.test(part)), `${text}: no punctuation-only chunks`)
  })
  // Standalone symbols must not inflate a sentence's syllable count.
  for (const text of ['', ' ', '...', '—', '#', '🎉', "'", '?!']) {
    t.deepEqual(splitTerm({ text }), [], `${text}: no syllables`)
  }
  t.end()
})

test('speech: surrounding punctuation stays on terms', t => {
  // Tokenizer-owned pre/post punctuation must not be copied into the syllables.
  const doc = nlp('“People!” #People re-enter foo/bar.').compute('syllables')
  const terms = doc.docs.flat()
  t.equal(terms[0].pre, '“')
  t.equal(terms[0].post, '!” ')
  t.deepEqual(terms[0].syllables, ['Peo', 'ple'])
  terms.forEach(term => {
    if (/[\p{L}\p{N}]/u.test(term.text)) {
      t.equal(term.syllables.join(''), term.text, `${term.text}: reconstruction`)
    }
  })
  t.end()
})

test('speech: possessive endings can add a syllable', t => {
  // Contrast audible possessive endings with suffixes that join the final chunk.
  const examples = [
    ["James's", ['James', "'s"]],
    ['horse’s', ['horse', '’s']],
    ["church's", ['church', "'s"]],
    ["boat's", ["boat's"]],
    ["table's", ['ta', "ble's"]],
  ]
  examples.forEach(([text, expected]) => {
    const actual = splitTerm({ text })
    t.deepEqual(actual, expected, text)
    t.equal(actual.join(''), text, `${text}: reconstruction`)
  })
  t.end()
})
