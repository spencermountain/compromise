const test = require('tape')
const nlp = require('./_lib')

const context = {
  today: '2021-04-17', //saturday
  timezone: 'Canada/Eastern',
}

const arr = [
  ['tomorrow, tuesday, wednesday', ['apr 18', 'apr 20', 'apr 21']],
  ['mon, tuesday', ['apr 19', 'apr 20']],
  ['mon, tuesday, wednesday', ['apr 19', 'apr 20', 'apr 21']],
  ['jan 2 or jan 4', ['jan 2nd', 'jan 4th']],
  ['jan 6 and jan 9', ['jan 6th', 'jan 9th']],
  // ['', ['', '', '']],
]

test('multi-dates', function (t) {
  arr.forEach((a) => {
    let found = nlp(a[0]).dates(context).get()
    t.equal(found.length, a[1].length, '[lenth] ' + a[0])
    a[1].forEach((str, i) => {
      let one = nlp(str).dates(context).get(0)
      t.equal((found[i] || {}).start, one.start, `[${i}] ` + str)
    })
  })
  t.end()
})
