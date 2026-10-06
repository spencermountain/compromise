import test from 'tape'
import nlp from '../_lib.js'

// Hand-written expectations, including noun and name contrasts.
const cases = [
  // pressure: missing Noun|Verb membership
  'They pressure the officials. {Noun,Vb,Det,Noun}',
  'The pressure is high. {Det,Noun,Vb,Adj}',
  'She pressures the officials. {Noun,Vb,Det,Noun}',
  'The pressures are high. {Det,Noun,Vb,Adj}',
  'They pressured the officials. {Noun,Vb,Det,Noun}',
  'They are pressuring the officials. {Noun,Vb,Vb,Det,Noun}',

  // bill: Person|Noun currently excludes the everyday verb reading
  'They bill the customer. {Noun,Vb,Det,Noun}',
  'The bill is overdue. {Det,Noun,Vb,Adj}',
  'She bills the customer. {Noun,Vb,Det,Noun}',
  'The bills are overdue. {Det,Noun,Vb,Adj}',
  'They billed the customer. {Noun,Vb,Det,Noun}',
  'They are billing the customer. {Noun,Vb,Vb,Det,Noun}',
  'Bill paid the customer. {Person,Vb,Det,Noun}',
]

test('switch candidates spec', t => {
  cases.forEach(line => {
    const failing = nlp.testSpec(line, false, false)
    t.deepEqual(failing.out('array'), [], line)
  })
  t.end()
})
