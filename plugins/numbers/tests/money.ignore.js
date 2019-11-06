const test = require('tape')
const nlp = require('./_lib')

test('money-basic:', function(t) {
  let r = nlp('it is $70.23')
  let m = r.match('#Money')
  t.equal(m.out('normal'), '$70.23', 'match-$70.23')

  r = nlp('it is $703')
  m = r.match('#Money+')
  t.equal(m.out('normal'), '$703', 'match-$703')

  r = nlp('it is five euros')
  m = r.match('#Money+')
  t.equal(m.out('normal'), 'five euros', 'match-five-euros')

  r = nlp('i said five times, you should pay 12 dollars')
  m = r.match('#Money+')
  t.equal(m.out('normal'), '12 dollars', 'match-12 dollars')

  r = nlp('you should pay sixty five dollars and four cents USD')
  m = r.match('#Money+')
  t.equal(m.out('normal'), 'sixty five dollars and four cents usd', 'match-long-usd')

  t.end()
})

test('money-has:', function(t) {
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
  tests.forEach(function(a) {
    let r = nlp(a[0])
    let m = r.match('#Money')
    t.equal(m.found, a[1], "money-has: '" + a[0] + "'")
  })
  t.end()
})
