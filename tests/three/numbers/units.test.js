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
    ['44°', 44, '°'],
    ['44 °c', 44, '°c'],
    ['12µs', 12, 'µs'],
    ['12km/h', 12, 'km/h'],
    // unrecognized units
    ['3rem', 3, 'rem'],
    ['500ccs', 500, 'ccs'],
    ['300max', 300, ''],
    ['3rd', 3, ''],
    ['500+', 500, ''],
    ['500 ccs', 500, ''],
  ]
  arr.forEach(a => {
    let [str, num, unit] = a
    let doc = nlp(str)
    let m = doc.numbers()
    t.equal(m.get()[0], num, here + ' [num] ' + str)
    t.equal(m.units().text('root'), unit, here + ' [unit] ' + str)
    // t.equal(doc.has(String(num)), true, here + '[has-num] ' + str)
    if (unit) {
      t.equal(doc.has(unit), true, here + '[has-unit] ' + str)
    } else {
      t.equal(doc.has('#Unit'), false, here + '[no-unit] ' + str)
    }
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


  t.equal(nlp('44,000 ft').has(44000), true, here + '44,000 ft')
  t.equal(nlp('44,000ft').has('44,000'), true, here + '44,000')
  // t.equal(nlp('44,000ft').has(44000), true, here + '44000')
  t.end()
})

// test('implicit units', function (t) {
//   let arr = [
//     // ['99%', '99%'],
//     // ['99%', '99 percent'],
//     // ['99%', '%'],
//     ['9ft', 'feet'],
//   ]
//   arr.forEach(a => {
//     let doc = nlp(a[0])
//     t.ok(doc.has(a[1]), here + a[1])
//   })
//   t.end()
// })
