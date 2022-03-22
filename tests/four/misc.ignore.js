import test from 'tape'
import nlp from './_lib.js'
const here = '[four/misc]'

test('match-set', function (t) {
  const doc = nlp(`located in canada in the year 2019.`)
  doc.match('(found|located) [in] #Place', 0).sense('in/place')
  doc.match('[in] the? #Date', 0).sense('in/time')

  t.ok(doc.has('{in} the year'), true, here + 'in-basic')
  t.ok(doc.has('{in/time} the year'), true, here + 'in/time')
  t.ok(doc.has('located {in/place} canada'), true, here + 'in/place')
  t.end()
})
