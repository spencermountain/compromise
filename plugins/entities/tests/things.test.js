const test = require('tape')
const nlp = require('./_lib')

test('topics concat:', function(t) {
  const things = nlp('spencer and danny are in Paris France and germany for Google Inc and IBM')
    .topics()
    .json({ normal: true, trim: true })
    .map(o => o.normal)
  const want = ['spencer', 'danny', 'paris france', 'germany', 'google inc', 'ibm']
  t.equal(things.join(', '), want.join(', '), 'found right things')
  t.end()
})
