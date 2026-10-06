import test from 'tape'
import assertSpec from '../_spec.js'

// Hand-written common readings and contrasts for the next switch candidates.
const cases = [
  'They number the pages. {Noun,Vb,Det,Noun}',
  'The number is wrong. {Det,Noun,Vb,Adj}',
  'They fine the driver. {Noun,Vb,Det,Noun}',
  'The driver is fine. {Det,Noun,Vb,Adj}',
  'The fine is large. {Det,Noun,Vb,Adj}',
  'They square the number. {Noun,Vb,Det,Noun}',
  'The room is square. {Det,Noun,Vb,Adj}',
  'The square is large. {Det,Noun,Vb,Adj}',
]

test('number, fine and square switch candidates spec', t => {
  assertSpec(t, cases)
  t.end()
})
