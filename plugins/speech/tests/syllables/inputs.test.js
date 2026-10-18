import test from 'tape'
import nlp from '../_lib.js'

// Flatten sentence results when checking individual inputs and reconstruction.
const syllables = word => {
  return nlp(word)
    .syllables()
    .flatMap(part => part)
}

test('speech: empty inputs and independent words', t => {
  t.deepEqual(syllables('boat table'), ['boat', 'ta', 'ble'])
  t.deepEqual(syllables('boat\ntable'), ['boat', 'ta', 'ble'])
  t.deepEqual(syllables('TABLE'), ['TA', 'BLE'])
  t.deepEqual(nlp('TABLE').syllables(), [['TA', 'BLE']], 'public API preserves original casing')
  for (const word of ['a', 'I', 'the', '123', 'rhythm', 'strengths', "don't", 'constructor', 'prototype']) {
    const parts = syllables(word)
    t.equal(parts.join(''), word, `${word}: reconstruction`)
    t.ok(
      parts.every(part => part.length > 0),
      `${word}: nonempty chunks`
    )
  }
  t.end()
})

test('speech: long inputs need no recursion', t => {
  // Many cuts and no cuts both need to work without growing the call stack.
  const word = 'ba'.repeat(20000)
  const parts = syllables(word)
  t.equal(parts.length, 20000)
  t.equal(parts.join(''), word)
  t.ok(parts.every(part => part === 'ba'))
  const consonants = 'b'.repeat(40000)
  t.deepEqual(syllables(consonants), [consonants])
  t.end()
})
