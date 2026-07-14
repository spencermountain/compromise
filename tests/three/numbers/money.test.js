import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/money] '


test('money-text:', function (t) {
  const arr = [
    // spelled-out words
    ['it cost 2 dollars', '2 dollars'],
    ['it was 3 euros', '3 euros'],
    ['it was 20 yuan', '20 yuan'],
    ['we spent 1,000 dollars', '1,000 dollars'],
    ['it cost $2.50', '$2.50'],
    ['the book was €20', '€20'],
    ['she paid £15.50', '£15.50'],
    ['a coffee for ¥500', '¥500'],
    ['he owes me ₹2000', '₹2000'],
    ['roughly ₩10000', '₩10000'],
    ['it costs 6 dollars and 5 cents', '6 dollars and 5 cents'],

  ]
  arr.forEach(a => {
    t.equal(nlp(a[0]).money().text(), a[1], here + a[0])
  })
  t.end()
})

test('money-number:', function (t) {
  const arr = [
    // spelled-out words
    ['it cost 2 dollars', 2],
    ['it was 3 euros', 3],
    ['it was 20 yuan', 20],
    ['we spent 1,000 dollars', 1000],
    ['it cost $2.50', 2.50],
    ['the book was €20', 20],
    ['she paid £15.50', 15.50],
    ['a coffee for ¥500', 500],
    ['he owes me ₹2000', 2000],
    ['roughly ₩10000', 10000],
    // ['it costs 6 dollars and 5 cents', 6.05],
  ]
  arr.forEach(a => {
    t.equal(nlp(a[0]).money().get()[0], a[1], here + a[0])
  })
  t.end()
})

test('money-currency:', function (t) {
  const arr = [
    // spelled-out words
    ['it cost 2 dollars', 'dollar'],
    ['it was 3 euros', 'euro'],
    ['it was 20 yuan', 'yuan'],
    ['we spent 1,000 dollars', 'dollar'],
    // symbol prefix
    ['it cost $2.50', 'dollar'],
    ['the book was €20', 'EUR'],
    ['she paid £15.50', 'GBP'],
    ['a coffee for ¥500', 'JPY/YEN'],
    ['he owes me ₹2000', 'INR'],
    ['roughly ₩10000', 'KRW'],
    ['the price is ฿250', 'THB'],
    // symbol suffix
    ['it costs 20€', 'EUR'],
    ['costs 5.30£', 'GBP'],
    // european decimal-comma
    ['the ticket cost 12,50€', 'EUR'],
    // abbreviated magnitudes
    ['about $5 million', 'dollar'],
    ['nearly £2.5m', 'GBP'],
    // iso-code suffixes
    ['the fee is 100 USD', 'usd'],
    ['$4.09CAD', 'dollar'],
    ['$400usd', 'dollar'],
    // localized currency word (russian rouble)
    ['the rent is 900 rub', 'rub'],
  ]
  arr.forEach(a => {
    t.equal(nlp(a[0]).money().currency()[0], a[1], here + a[0])
  })
  t.end()
})
