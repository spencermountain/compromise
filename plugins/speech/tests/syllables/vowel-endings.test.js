import test from 'tape'
import splitTerm from '../../src/syllables/split/index.js'

// Contrast silent endings and blended vowels with similar, separately voiced forms.
const examples = [
  ['opaque', 2],
  ['opaques', 2],
  ['opaquely', 3],
  ['queue', 1],
  ['queuing', 2],
  ['gorgeous', 2],
  ['courteous', 3],
  ['beauteous', 3],
  ['aesthetic', 3],
  ['aerial', 3],
  ['boa', 2],
  ['boas', 2],
  ['boat', 1],
  ['“Boas!”', 2],
]

test('speech: vowel endings preserve contrasting pronunciations', t => {
  examples.forEach(([text, count]) => {
    const parts = splitTerm({ text })
    t.equal(parts.length, count, text)
    t.equal(parts.join(''), text, `${text}: reconstruction`)
  })
  t.end()
})
