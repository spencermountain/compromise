import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-units] '

test('units-basic:', function (t) {
  let arr = [
    // ['33km', 'km'],
    ['33 km', 'km'],
    ['40,000 ft', 'ft'],
    ['40,000 feet', 'feet'],
    ['seven hundred litres', 'litres'],
    ['one litre', 'litre'],
    ['0.4 meter', 'meter'],
    // ['3 km2', 'km2'],
    ['3 km²', 'km²'],
    // ['44 °c', '°c'],
  ]
  arr.forEach(a => {
    let m = nlp(a[0]).numbers().units()
    t.equal(m.out('normal'), a[1], here + a[0])
  })
  t.end()
})