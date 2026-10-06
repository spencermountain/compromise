import test from 'tape'
import assertSpec from '../_spec.js'

// Adj|Present switches, retaining adjective and noun readings.
const cases = [
  'They tense their muscles. {Noun,Vb,Poss,Noun}',
  'The atmosphere is tense. {Det,Noun,Vb,Adj}',
  'The tense is wrong. {Det,Noun,Vb,Adj}',
  'They bare their teeth. {Noun,Vb,Poss,Noun}',
  'The walls are bare. {Det,Noun,Vb,Adj}',
  'They brave the cold. {Noun,Vb,Det,Noun}',
  'The children are brave. {Det,Noun,Vb,Adj}',
]

test('tense, bare and brave switches spec', t => {
  assertSpec(t, cases)
  t.end()
})
