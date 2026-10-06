import test from 'tape'
import assertSpec from '../_spec.js'

// Hand-written contrasts for adjective, actor and noun switches.
const cases = [
  // Adj|Present
  'They dim the lights. {Noun,Vb,Det,Noun}',
  'The lights are dim. {Det,Noun,Vb,Adj}',
  // Actor|Verb
  'They captain the team. {Noun,Vb,Det,Noun}',
  'The captain is tired. {Det,Actor,Vb,Adj}',
  'They pioneer new methods. {Noun,Vb,Adj,Noun}',
  'The pioneer is famous. {Det,Actor,Vb,Adj}',
  // Noun|Verb
  'They inventory the supplies. {Noun,Vb,Det,Noun}',
  'The inventory is complete. {Det,Noun,Vb,Adj}',
]

test('dim, captain, pioneer and inventory switches spec', t => {
  assertSpec(t, cases)
  t.end()
})
