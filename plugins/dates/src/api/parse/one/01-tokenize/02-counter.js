/*
a 'counter' is a Unit determined after a point
  * first hour of x
  * 7th week in x
  * last year in x
  * 
unlike a shift, like "2 weeks after x"
*/
const oneBased = {
  minute: true,
}

const getCounter = function (doc) {
  // 7th week of
  let m = doc.match('[<num>#Value] [<unit>#Duration+] (of|in)')
  if (m.found) {
    let obj = m.groups()
    let num = obj.num.numbers().get()[0]
    let unit = obj.unit.text('reduced')
    let result = {
      unit: unit,
      num: Number(num) || 0,
    }
    // 0-based or 1-based units
    if (!oneBased[unit]) {
      result.num -= 1
    }
    return { result, m }
  }
  // first week of
  m = doc.match('[<dir>(first|initial|last|final)] [<unit>#Duration+] (of|in)')
  if (m.found) {
    let obj = m.groups()
    let dir = obj.dir.text('reduced')
    let unit = obj.unit.text('reduced')
    if (dir === 'initial') {
      dir = 'first'
    }
    if (dir === 'final') {
      dir = 'last'
    }
    let result = {
      unit: unit,
      dir: dir,
    }
    return { result, m }
  }

  return { result: null, m: doc.none() }
}
export default getCounter
