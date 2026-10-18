import test from 'tape'
import splitTerm from '../../src/syllables/split/index.js'

// Name-ending rules must not change similar vowel pairs in ordinary words.
const examples = [
  ['Patricia', 3], ['Alicia', 3], ['Brescia', 2], ['Boccia', 2],
  ['Gabriella', 4], ['Gabrielli', 4], ['Cappiello', 4],
  ['Juliet', 3], ['Henriette', 3], ['“Patricia’s!”', 3],
  ['social', 2], ['special', 2], ['musician', 3], ['association', 5],
  ['glaciation', 4], ['appreciation', 5], ['field', 1], ['friend', 1],
  ['shield', 1], ['yield', 1], ['quiet', 2], ['quietly', 3],
  ['diet', 2], ['died', 1], ['society', 4],
]

test('speech: final cia and separate ie vowels', t => {
  examples.forEach(([text, count]) => {
    const parts = splitTerm({ text })
    t.equal(parts.length, count, text)
    t.equal(parts.join(''), text, `${text}: original spelling`)
  })
  // Check readable cuts rather than only the number of syllables.
  t.deepEqual(splitTerm({ text: 'Gabriella' }), ['Ga', 'bri', 'el', 'la'])
  t.deepEqual(splitTerm({ text: 'Patricia' }), ['Pa', 'tri', 'cia'])
  t.deepEqual(splitTerm({ text: 'Juliet' }), ['Ju', 'li', 'et'])
  t.end()
})
