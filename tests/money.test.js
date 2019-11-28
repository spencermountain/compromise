const test = require('tape')
const nlp = require('./_lib')

test('money tests', function(t) {
  let doc = nlp('i paid 5 USD for the thing, and got $2.50 back.')
  let m = doc.money()
  t.equal(m.length, 2, 'both money forms')
  t.equal(m.eq(0).text(), '5 USD', 'val-currency')
  t.equal(m.eq(1).text(), '$2.50', 'sybol-val')

  doc = nlp('i got 1 peso and £30.')
  m = doc.money()
  t.equal(m.length, 2, 'both intl money forms')
  t.equal(m.eq(0).text(), '1 peso', 'val-currency-2')
  t.equal(m.eq(1).text(), '£30', 'sybol-val-2')
  t.end()
})
