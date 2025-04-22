import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/number] '

// test('get currency ', function (t) {
//   let arr = [
//     ['50 canadian dollars', 'CAD'],
//     ['10.5 kronor', 'SEK'],
//     ['100 öre', 'SEK'],
//     ['$50 CAD', 'CAD'],
//     ['50 WON', 'KRW'],
//     ['£30.50', 'GBP'],
//     ['₩50', 'KRW'],
//     ['$50', 'USD'],
//     ['$50CAD', 'CAD'],
//   ]
//   arr.forEach((a) => {
//     let doc = nlp(a[0])
//     let json = doc.money().json()[0]
//     t.equal(a[1], json.iso, here + a[0])
//   })
//   t.end()
// })

// test('money formats', function (t) {
//   let doc = nlp('£30.50')
//   let str = doc.money().toText()
//   t.equal(str, 'thirty point five pounds', here)

//   doc = nlp('9 WON')
//   str = doc.money().toText()
//   t.equal(str, 'nine won', '9 won', here)
//   t.end()
// })

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

test('money-transform:', function (t) {
  let doc = nlp('i paid $5.32 for a pizza slice')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid $6.32 for a pizza slice', here + 'money-add-one')

  doc = nlp('i paid fifty eight dollars')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid fifty nine dollars', here + 'text-add-one')
  t.end()
})

test('money-has:', function (t) {
  const tests = [
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
    const r = nlp(a[0])
    const m = r.match('#Money')
    t.equal(m.found, a[1], here + "money-has: '" + a[0] + "'")
  })
  t.end()
})

test('money-parse:', function (t) {
  const arr = [
    ['i paid $5.32 for a pizza slice', 5.32],
    ['i paid $12 for a pizza slice', 12],
    ['it was $12.00', 12],
    ['it was $12.00.', 12],
    ['it was $12.00?', 12],
    ['it was $0', 0],
    ['it was 0 dollars', 0],
    ['five dollars and thirty-five cents', 5.35],
    ['eight dollars and five cents', 8.05],
    ['eight hundred dollars and five cents', 800.05],
    ['eight hundred and twenty dollars and fifteen cents', 820.15],
    ['eight hundred and twenty five dollars and thirty cents', 825.3],
    ['eight hundred and twenty five dollars and thirty five cents', 825.35],
    ['it was zero dollars', 0],
    ['i paid fifty eight euros for it', 58],
    ['was offered 12 thousand pounds as a reward', 12000],
    ['£0.20', 0.2],
    // pennies/cents
    // ['50 cents', 0.5],
    // ['99 cents', 0.99],
    // ['two pennies', 0.02],
    // ['six grosz', 0.06],
    // ['six grosz', 0.06],
    // ['120 öre', 1.2],
    // ['200 dirham', 2],
  ]
  arr.forEach((a) => {
    const doc = nlp(a[0])
    const amount = doc.money().get()
    t.equal(amount.length, 1, here + `'${a[0]}' has 1 money result`)
    t.equal(amount[0], a[1], here + a[0])
  })
  t.end()
})

test('money false-positive:', function (t) {
  const arr = [
    'i paid nothing for a pizza slice',
    'i paid no money for a pizza slice',
    'im a millionaire',
    '$12.0082',
    '008f2 dollars',
    'canadian money',
    'USD is on the rise',
    'bitcoin is on the rise',
    'money penny',
  ]
  arr.forEach((a) => {
    const doc = nlp(a[0])
    const m = doc.money()
    t.equal(m.found, false, here + `not money - '${a}'`)
  })
  t.end()
})
