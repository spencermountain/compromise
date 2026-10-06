import test from 'tape'
import assertSpec from '../_spec.js'

// Hand-written contrasts for noun, adjective and actor switches.
const cases = [
  // Noun|Verb
  'They sequence the genes. {Noun,Vb,Det,Noun}',
  'The sequence is clear. {Det,Noun,Vb,Adj}',
  // Adj|Present
  'They parallel the road. {Noun,Vb,Det,Noun}',
  'The roads are parallel. {Det,Noun,Vb,Adj}',
  'The parallel is clear. {Det,Noun,Vb,Adj}',
  // Actor|Verb
  'They shepherd the children. {Noun,Vb,Det,Noun}',
  'The shepherd is tired. {Det,Actor,Vb,Adj}',
]

test('sequence, parallel and shepherd switches spec', t => {
  assertSpec(t, cases)
  t.end()
})
