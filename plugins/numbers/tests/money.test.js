const test = require('tape')
const nlp = require('./_lib')

test('get currency ', function (t) {
  let arr = [
    ['£30.50', 'GBP'],
    ['10.5 kronor', 'SEK'],
    ['100 öre', 'SEK'],
    ['$50', 'USD'],
    ['CAD$50', 'CAD'],
    ['$50 CAD', 'CAD'],
    ['₩50', 'KRW'],
    ['50 WON', 'KRW'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let json = doc.money().json(0)
    t.equal(a[1], json.iso, a[0])
  })
  t.end()
})

test('money text', function (t) {
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

  doc = nlp('it is $70.23')
  m = doc.money()
  t.equal(m.out('normal'), '$70.23', 'match-$70.23')

  doc = nlp('it is $703')
  m = doc.money()
  t.equal(m.out('normal'), '$703', 'match-$703')

  doc = nlp('it is five euros')
  m = doc.money()
  t.equal(m.out('normal'), 'five euros', 'match-five-euros')

  doc = nlp('i said five times, you should pay 12 dollars')
  m = doc.money()
  t.equal(m.out('normal'), '12 dollars', 'match-12 dollars')

  // r = nlp('you should pay sixty five dollars and four cents USD')
  // m = r.money()
  // t.equal(m.out('normal'), 'sixty five dollars and four cents usd', 'match-long-usd')

  t.end()
})

test('money-transform:', function (t) {
  let doc = nlp('i paid $5.32 for a pizza slice')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid $6.32 for a pizza slice', 'money-add-one')

  doc = nlp('i paid fifty eight dollars')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid fifty nine dollars', 'text-add-one')
  t.end()
})

test('money-has:', function (t) {
  let tests = [
    ['$7', true],
    ['$7.0', true],
    ['$7.00', true],
    ['$7.003', false],

    ['$7082.03', true],
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
    let r = nlp(a[0])
    let m = r.match('#Money')
    t.equal(m.found, a[1], "money-has: '" + a[0] + "'")
  })
  t.end()
})
