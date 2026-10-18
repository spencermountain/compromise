import test from 'tape'
import splitTerm from '../../src/syllables/split/index.js'

// Check readable boundaries as well as the counts in the HMM fixture.
const examples = [
  ['Batesville', ['Bates', 'ville']],
  ['Belge', ['Bel', 'ge']],
  ['Belleville', ['Belle', 'ville']],
  ['Bridgeport', ['Bridge', 'port']],
  ['Cambridgeport', ['Cam', 'bridge', 'port']],
  ['Cambridgeside', ['Cam', 'bridge', 'side']],
  ['Canadienne', ['Ca', 'na', 'di', 'enne']],
  ['Janesville', ['Janes', 'ville']],
  ['Mildred', ['Mil', 'dred']],
  ['Nietzsche', ['Nietz', 'sche']],
  ['Odea', ['O', 'de', 'a']],
  ['Roseberry', ['Rose', 'ber', 'ry']],
  ['Roseville', ['Rose', 'ville']],
  ['zoologist', ['zo', 'ol', 'o', 'gist']],
  ['zoology', ['zo', 'ol', 'o', 'gy']],
  ['zoologists', ['zo', 'ol', 'o', 'gists']],
  ['“Mildred’s!”', ['“Mil', 'dred’s!”']],
  ["Bridgeport's", ['Bridge', "port's"]],
]

test('speech: remaining benchmark exceptions preserve readable spelling', t => {
  examples.forEach(([text, expected]) => {
    const parts = splitTerm({ text })
    t.deepEqual(parts, expected, text)
    t.equal(parts.join(''), text, `${text}: original spelling`)
  })
  t.end()
})
