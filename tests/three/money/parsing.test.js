import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/money/parsing] '

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
  arr.forEach(a => {
    const doc = nlp(a[0])
    const amount = doc.money().get()
    t.equal(amount.length, 1, here + `'${a[0]}' has 1 money result`)
    t.equal(amount[0], a[1], here + a[0])
  })
  t.end()
})
