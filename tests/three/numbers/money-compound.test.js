import test from 'tape'
import nlp from '../_lib.js'

const here = '[three/money compound] '

test('money multiword and compound amounts', t => {
  const cases = [
    ['fifty eight euros', 58],
    ['12 thousand pounds', 12000],
    ['five dollars and thirty-five cents', 5.35],
    ['eight dollars and five cents', 8.05],
    ['eight hundred dollars and five cents', 800.05],
    ['eight hundred and twenty dollars and fifteen cents', 820.15],
    ['eight hundred and twenty five dollars and thirty cents', 825.3],
    ['eight hundred and twenty five dollars and thirty five cents', 825.35],
    ['sixty five dollars and four cents USD', 65.04],
    ['5 dollars 32 cents', 5.32],
    ['$5 and 32 cents', 5.32],
    ['zero dollars and five cents', 0.05],
    ['50 cents', 50],
    ['$7.003', 7.003],
    ['$12.0082', 12.0082],
  ]
  cases.forEach(([text, expected]) => {
    const doc = nlp(`i paid ${text} for lunch`)
    const money = doc.money()
    t.equal(money.length, 1, here + text + ' selection count')
    t.equal(money.text(), text, here + text + ' entire amount')
    t.deepEqual(money.get(), [expected], here + text + ' value')
  })
  t.end()
})

test('money keeps unrelated amounts separate', t => {
  const cases = [
    ['five dollars and ten euros', ['five dollars', 'ten euros'], [5, 10]],
    ['$5 and $10', ['$5', '$10'], [5, 10]],
    ['five dollars and ten dollars', ['five dollars', 'ten dollars'], [5, 10]],
    ['five yen and ten cents', ['five yen', 'ten cents'], [5, 10]],
    ['5 dollars for lunch and 32 cents for tax', ['5 dollars', '32 cents'], [5, 32]],
  ]
  cases.forEach(([text, selections, values]) => {
    const money = nlp(text).money()
    t.deepEqual(money.out('array'), selections, here + text + ' selections')
    t.deepEqual(money.get(), values, here + text + ' values')
  })
  t.end()
})

test('compound money currency and comparisons', t => {
  const doc = nlp('i paid five dollars and thirty five cents for lunch')
  const money = doc.money()
  t.deepEqual(money.currency(), ['dollar'], here + 'major currency')
  t.equal(money.greaterThan(5).text(), 'five dollars and thirty five cents', here + 'comparison')
  t.deepEqual(money.json()[0].money, {currency: 'dollar', num: 5.35}, here + 'json')
  t.equal(money.add(1).text(), 'five dollars and thirty five cents', here + 'compound arithmetic stays unchanged')
  t.end()
})
