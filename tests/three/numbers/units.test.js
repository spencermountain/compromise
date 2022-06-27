import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-units] '

test('units-parse:', function (t) {
  let arr = [
    ['33km', 33, 'km'],
    ['33 km', 33, 'km'],
    ['40,000 ft', 40000, 'ft'],
    ['40,000ft', 40000, 'ft'],
    ['40,000 feet', 40000, 'feet'],
    ['seven hundred litres', 700, 'litres'],
    ['one litre', 1, 'litre'],
    ['0.4 meter', 0.4, 'meter'],
    ['3 km2', 3, 'km2'],
    ['3 km²', 3, 'km²'],
    ['3km²', 3, 'km²'],
    ['44°c', 44, '°c'],
    ['44 °c', 44, '°c'],
    ['12µs', 12, 'µs'],
    ['12km/h', 12, 'km/h'],
  ]
  arr.forEach(a => {
    let m = nlp(a[0]).numbers()
    t.equal(m.get()[0], a[1], here + ' [num] ' + a[0])
    t.equal(m.units().text('root'), a[2], here + ' [unit] ' + a[0])
  })
  t.end()
})


test('units-convert:', function (t) {
  let doc = nlp('we covered 3 km² in total')
  doc.numbers().toText()
  t.equal(doc.text(), 'we covered three km² in total', here + 'space unit')

  doc = nlp('we covered 3km² in total')
  doc.numbers().toText()
  t.equal(doc.text(), 'we covered three km² in total', here + 'no space unit')
  t.end()
})