import test from 'tape'
import assertSpec from '../_spec.js'

// Common verb readings with noun and adjective contrasts.
const cases = [
  'They quiz the students. {Noun,Vb,Det,Noun}',
  'The quiz was difficult. {Det,Noun,Vb,Adj}',
  'They alert the staff. {Noun,Vb,Det,Noun}',
  'The staff are alert. {Det,Noun,Vb,Adj}',
  'The alert was useful. {Det,Noun,Vb,Adj}',
  'They sanction the deal. {Noun,Vb,Det,Noun}',
  'The sanction is severe. {Det,Noun,Vb,Adj}',
]

test('quiz, alert and sanction switches spec', t => {
  assertSpec(t, cases)
  t.end()
})
