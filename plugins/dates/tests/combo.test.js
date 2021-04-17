const test = require('tape')
const nlp = require('./_lib')

const context = {
  today: '2021-04-17', //saturday
  timezone: 'Canada/Eastern',
}

const arr = [
  // independant dates
  ['tomorrow, tuesday, wednesday', ['apr 18', 'apr 20', 'apr 21']],
  ['mon, tuesday', ['apr 19', 'apr 20']],
  ['mon, tuesday, wednesday', ['apr 19', 'apr 20', 'apr 21']],
  ['jan 2 or jan 4', ['jan 2nd', 'jan 4th']],
  ['jan 6 and jan 9', ['jan 6th', 'jan 9th']],
  ['between jan 5 and jan 10', ['jan 5-10']],
  ['feb 5 or next weekend', ['february 5', 'apr 24']],
  // ['march, may, or june', ['march', 'may', 'june']],

  // dependant date combos
  ['march 3rd and 4th', ['mar 3', 'mar 4']],
  ['feb 2 or third', ['feb 2nd', 'feb 3']],
  // ['february 5th, 6th or 7th', ['feb 5', 'feb 6', 'feb 7']],
  // ['february 5th, 6th and 7th', ['feb 5', 'feb 6', 'feb 7']],
  // ['', ['', '', '']],
]

test('multi-dates', function (t) {
  arr.forEach((a) => {
    let found = nlp(a[0]).dates(context).get()
    t.equal(found.length, a[1].length, '[lenth] ' + a[0])
    a[1].forEach((str, i) => {
      let one = nlp(str).dates(context).get(0)
      t.equal((found[i] || {}).start, one.start, `[combo: ${i}] ` + str)
    })
  })
  t.end()
})
