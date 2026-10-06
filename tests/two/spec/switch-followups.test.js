import test from 'tape'
import assertSpec from '../_spec.js'

// Hand-written expectations include the noun/adjective readings to preserve.
const cases = [
  'They average ten points. {Noun,Vb,Val,Noun}',
  'The average is high. {Det,Noun,Vb,Adj}',
  'The score is average. {Det,Noun,Vb,Adj}',
  'They round the corner. {Noun,Vb,Det,Noun}',
  'The table is round. {Det,Noun,Vb,Adj}',
  'The round is over. {Det,Noun,Vb,Adj}',
  'They ready the boat. {Noun,Vb,Det,Noun}',
  'The boat is ready. {Det,Noun,Vb,Adj}',
]

test('adjective and verb switches spec', t => {
  assertSpec(t, cases)
  t.end()
})
