import test from 'tape'
import nlp from './_lib.js'
import spacetime from 'spacetime'

test('week-logic', function (t) {
  const tests = [
    {
      today: '2021-03-01', //on monday
      tests: [
        ['monday', 'monday', 0], // today
        ['tuesday', 'tuesday', 1],
        ['wednesday', 'wednesday', 2],
        ['thursday', 'thursday', 3],
        ['friday', 'friday', 4],
        ['saturday', 'saturday', 5],
        ['sunday', 'sunday', 6],
        // 'this'
        ['this week', 'monday', 0],
        ['this monday', 'monday', 0], // today
        ['this tuesday', 'tuesday', 1],
        ['this wednesday', 'wednesday', 2],
        ['this thursday', 'thursday', 3],
        ['this friday', 'friday', 4],
        ['this weekend', 'saturday', 5],
        ['this saturday', 'saturday', 5],
        ['this sunday', 'sunday', 6],
        //'last'
        ['last week', 'monday', -7],
        ['last monday', 'monday', -7],
        ['last tuesday', 'tuesday', -6],
        ['last wednesday', 'wednesday', -5],
        ['last thursday', 'thursday', -4],
        ['last friday', 'friday', -3],
        ['last weekend', 'saturday', -2],
        ['last saturday', 'saturday', -2],
        ['last sunday', 'sunday', -1],
        // this past
        ['this past week', 'monday', -7],
        ['this past monday', 'monday', -7],
        ['this past tuesday', 'tuesday', -6],
        ['this past wednesday', 'wednesday', -5],
        ['this past thursday', 'thursday', -4],
        ['this past friday', 'friday', -3],
        ['this past weekend', 'saturday', -2],
        ['this past saturday', 'saturday', -2],
        ['this past sunday', 'sunday', -1],
        //'next'
        ['next week', 'monday', 7],
        ['next monday', 'monday', 7],
        ['next tuesday', 'tuesday', 8],
        ['next wednesday', 'wednesday', 9],
        ['next thursday', 'thursday', 10],
        ['next friday', 'friday', 11],
        ['next weekend', 'saturday', 12],
        ['next saturday', 'saturday', 12],
        ['next sunday', 'sunday', 13],
      ],
    },
    {
      today: '2021-03-05', //on friday
      tests: [
        ['monday', 'monday', 3],
        ['tuesday', 'tuesday', 4],
        ['wednesday', 'wednesday', 5],
        ['thursday', 'thursday', 6],
        ['friday', 'friday', 0], // today
        ['saturday', 'saturday', 1],
        ['sunday', 'sunday', 2],
        // 'this'
        ['this week', 'monday', -4], //backward
        ['this monday', 'monday', 3],
        ['this tuesday', 'tuesday', 4],
        ['this wednesday', 'wednesday', 5],
        ['this thursday', 'thursday', 6],
        ['this friday', 'friday', 0], // today
        ['this weekend', 'saturday', 1],
        ['this saturday', 'saturday', 1],
        ['this sunday', 'sunday', 2],
        //'last'
        ['last week', 'monday', -7 - 4],
        ['last monday', 'monday', -7 - 4],
        ['last tuesday', 'tuesday', -7 - 3],
        ['last wednesday', 'wednesday', -7 - 2],
        ['last thursday', 'thursday', -7 - 1],
        ['last friday', 'friday', -7],
        ['last weekend', 'saturday', -6],
        ['last saturday', 'saturday', -6],
        ['last sunday', 'sunday', -5],
        //'this past'
        ['this past week', 'monday', -7 - 4],
        ['this past monday', 'monday', -4],
        ['this past tuesday', 'tuesday', -3],
        ['this past wednesday', 'wednesday', -2],
        ['this past thursday', 'thursday', -1],
        ['this past friday', 'friday', -7], //
        ['this past weekend', 'saturday', -6],
        ['this past saturday', 'saturday', -6],
        ['this past sunday', 'sunday', -5],
        // //'next'
        ['next week', 'monday', 3],
        ['next monday', 'monday', 3],
        ['next tuesday', 'tuesday', 4],
        ['next wednesday', 'wednesday', 5],
        ['next thursday', 'thursday', 6],
        ['next friday', 'friday', 7],
        ['next weekend', 'saturday', 8],
        ['next saturday', 'saturday', 8],
        ['next sunday', 'sunday', 9],
      ],
    },
  ]
  tests.forEach((obj) => {
    const ctx = { today: obj.today }
    const today = spacetime(obj.today)
    obj.tests.forEach((a) => {
      const dates = nlp(a[0]).dates(ctx).get()
      t.equal(dates.length, 1, '[one date] ' + a[0])
      const s = spacetime(dates[0].start)
      t.equal(s.format('day').toLowerCase(), a[1], '[day] ' + a[0])
      // compare isos
      const want = today.add(a[2], 'day')
      t.equal(want.format('iso-short'), s.format('iso-short'), `[${a[2]} days] '${a[0]}'`)
    })
  })

  t.end()
})
