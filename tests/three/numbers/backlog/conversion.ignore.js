import test from 'tape'
import nlp from '../../_lib.js'
const here = '[three/number] '

test('fraction/percent conversion', function (t) {
  let arr = [
    [`it was 80% of my paycheque.`, 'it was 80/100 of my paycheque.'],
    [`42%`, '42/100'],
    [`110%`, '110/100'],
    [`2000%`, '2000/100'],
    // [`4.5%`, '4.5/100'],
    // [`0.2%`, '0.2/100'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    doc.percentages().toFraction()
    t.equal(doc.text(), a[1], here+'toFraction')
    doc.fractions().toPercentage()
    t.equal(doc.text(), a[0], here+'toPercentage')
  })
  t.end()
})
