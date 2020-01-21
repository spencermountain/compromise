const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

let arr = [
  // *explicit-dates**,
  // `march 2nd`,
  // `2 march`,
  // `tues march 2`,
  `march the second`,
  // `on the 2nd`,
  // // *numerical-dates**,
  // `1999/03/02`,
  // `1999-03-02`,
  // `03-02-1999`,
  // `03/02`,
  // `2015.08.13`,
  // // *named-dates**,
  // `today`,
  // `easter`,
  // `q1`,
  // `tomorrow`,
  // // *time:**,
  // `2pm`,
  // `2:12pm`,
  // `2:12`,
  // `02:12:00`,
  // `2 oclock`,
  // `before 1`,
  // `noon`,
  // `at night`,
  // `in the morning`,
  // `tomorrow evening`,
  // // *timezone:**,
  // `eastern time`,
  // `est`,
  // `peru time`,
  // `GMT+9`,
  // // *relative duration**,
  // `this march`,
  // `this week`,
  // `this sunday`,
  // `next april`,
  // `this past year`,
  // `second week of march`,
  // `last weekend of march`,
  // `last spring`,
  // `the saturday after next`,
  // // *punt**,
  // `two days after tomorrow`,
  // `in seven weeks`,
  // `2 weeks from now`,
  // `2 weeks after`,
  // `2 years 4 months 5 days ago`,
  // `a week friday`,
  // `a week and a half before`,
  // `on the 1st`,
  // // *start/end**,
  // `end of the week`,
  // `start of next year`,
  // `start of next year`,
  // `middle of q2 last year`,
]

// let doc = nlp(arr[0]).debug()
// let json = doc.dates({}).json()
// console.log(json)

let doc = nlp('5th of June and then 7th of April cool')
// let m = doc.match('[<date>#Value of #Month] cool')
let m = doc.match('[<a>#Value] of [<b>#Month]')
// m.debug()
// console.log(m.list[0].names)
console.log(m.groupByNames())
// console.log(m.text())
// m.named().debug()
// console.log(m.named().text())
