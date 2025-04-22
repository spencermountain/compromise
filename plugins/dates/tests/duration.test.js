import test from 'tape'
import nlp from './_lib.js'
// const relaxed = 14

const february = 1
//number of days between start+end
const tests = [
  {
    //for reference: https://calendar.google.com/calendar/render#main_7%7Cmonth-3+23617+23654+23617
    today: [2016, february, 11],
    tests: [
      ['today', 1],
      ['tomorrow', 1],
      ['next week', 7],
      ['sometime next week', 7],
      ['on october 22nd', 1],
      ['on feb 22 2019', 1],
      ['july 3rd', 1],
      ['2/12/2018', 1],
      ['on 22/2/2016', 1],
      ['before tomorrow', 1],

      // ['next month', 31], //march
      // ['this march', 31],
      // ['this september', 30],
      // ['next march', 31],
      // ['in july', 31],
      // ['next february', 28],
      ['february 12th', 1],
      //'by' includes today
      ['by february 12th', 1],
      ['by february 21', 10],
      ['before february 22', 11],
      ['before march', 19],

      ['on february 22', 1],
      ['between monday and tuesday', 1],
      ['between monday and wednesday', 2],
      // ['tuesday and wednesday next week', 2],
      // ['march and april 2022', 61],
      ['first week of september', 7],
      ['second week of october', 7],
      ['third week of june', 7],
      ['fourth week of july', 7],
      ['last week of july', 7],
      // ['after july', relaxed],
      // ['after september 4rth 2016', relaxed],
    ],
  },
]

test('day durations', t => {
  tests.forEach(obj => {
    const context = {
      today: obj.today,
    }
    const today = obj.today.join('-')
    obj.tests.forEach(a => {
      const json = nlp(a[0]).dates(context).json()[0] || { dates: {} }
      const duration = json.dates.duration || {}
      t.equal(duration.days, a[1], `[${today}] ${a[0]}`)
    })
  })
  t.end()
})
