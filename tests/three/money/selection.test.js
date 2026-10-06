import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/money/selection] '

test('money text', function (t) {
  let doc = nlp('i paid 5 USD for the thing, and got $2.50 back.')
  let m = doc.money()
  t.equal(m.length, 2, here + 'both money forms')
  t.equal(m.eq(0).text(), '5 USD', here + 'val-currency')
  t.equal(m.eq(1).text(), '$2.50', here + 'sybol-val')

  doc = nlp('i got 1 peso and £30.')
  m = doc.money()
  t.equal(m.length, 2, here + 'both intl money forms')
  t.equal(m.eq(0).text(), '1 peso', here + 'val-currency-2')
  t.equal(m.eq(1).text(), '£30', here + 'sybol-val-2')

  doc = nlp('it is $70.23')
  m = doc.money()
  t.equal(m.out('normal'), '$70.23', here + 'match-$70.23')

  doc = nlp('it is $703')
  m = doc.money()
  t.equal(m.out('normal'), '$703', here + 'match-$703')

  doc = nlp('it is five euros')
  m = doc.money()
  t.equal(m.out('normal'), 'five euros', here + 'match-five-euros')

  doc = nlp('i said five times, you should pay 12 dollars')
  m = doc.money()
  t.equal(m.out('normal'), '12 dollars', here + 'match-12 dollars')

  doc = nlp('you should pay sixty five dollars and four cents USD')
  m = doc.money()
  t.equal(m.out('normal'), 'sixty five dollars and four cents usd', here + 'match-long-usd')

  t.end()
})


test('money-has:', function (t) {
  const tests = [
    ['$7', true],
    ['$7.0', true],
    ['$7.00', true],
    ['$7.003', true],

    ['$7082.03', true],
    ['$12.0082', true],
    ['$2,082.03', true],
    ['€7.00', true],
    ['¥70', true],
    ['£0.20', true],
    ['@0.20', false],

    ['8 cents', true],
    ['60 pence', true],
    ['sixty pence', true],
    ['sixty USD', true],
  ]
  tests.forEach(function (a) {
    const r = nlp(a[0])
    const m = r.match('#Money')
    t.equal(m.found, a[1], here + "money-has: '" + a[0] + "'")
  })
  t.end()
})


test('money false-positive:', function (t) {
  const arr = [
    'i paid nothing for a pizza slice',
    'i paid no money for a pizza slice',
    'im a millionaire',
    '008f2 dollars',
    'canadian money',
    'USD is on the rise',
    'bitcoin is on the rise',
    'money penny',
  ]
  arr.forEach(a => {
    const doc = nlp(a[0])
    const m = doc.money()
    t.equal(m.found, false, here + `not money - '${a}'`)
  })
  t.end()
})
