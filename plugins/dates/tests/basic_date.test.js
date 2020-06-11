const test = require('tape')
const nlp = require('./_lib')

const context = {
  today: { year: 2019 },
}

test('date-parse :', function (t) {
  let arr = [
    ['june 5th 1999', '1999-06-05T00:00:00.000Z'],
    ['june 5th 1999', '1999-06-05T00:00:00.000Z'],
    ['january 1st 1644', '1644-01-01T00:00:00.000Z'],
    ['jan 1st 1644', '1644-01-01T00:00:00.000Z'],
    ['June 4th 1993', '1993-06-04T00:00:00.000Z'],
    ['March 1st 1987', '1987-03-01T00:00:00.000Z'],
    ['June 22nd 2014', '2014-06-22T00:00:00.000Z'],
    ['may 22nd 2014', '2014-05-22T00:00:00.000Z'],
    ['sep 22nd 2014', '2014-09-22T00:00:00.000Z'],
    ['apr 22nd 2014', '2014-04-22T00:00:00.000Z'],
    ['June 22nd 1997', '1997-06-22T00:00:00.000Z'],
    ['january 5th 1998', '1998-01-05T00:00:00.000Z'],
    //num of month
    ['3rd of March 1969', '1969-03-03T00:00:00.000Z'],
    ['2nd of April 1929', '1929-04-02T00:00:00.000Z'],
    ['2nd of jul 1929', '1929-07-02T00:00:00.000Z'],
    //no date
    ['March 1969', '1969-03-01T00:00:00.000Z'],
    ['jan 1921', '1921-01-01T00:00:00.000Z'],

    //no-year
    ['March 18th', '2019-03-18T00:00:00.000Z'],
    ['August 28th', '2019-08-28T00:00:00.000Z'],
    ['18th of March', '2019-03-18T00:00:00.000Z'],
    ['27th of March', '2019-03-27T00:00:00.000Z'],
    ['february 10th', '2019-02-10T00:00:00.000Z'],
    ['february 28th', '2019-02-28T00:00:00.000Z'],
    //invalid dates
    // ['303rd of March 1969', [2, null, 1969]],
    // ['4103', [null, null, null]],

    // ['January 5th 4032', [0, 5, null]],
  ]
  arr.forEach(function (a) {
    let json = nlp(a[0]).dates(context).json()[0]
    let start = json.date.start
    t.equal(start, a[1], a[0])
  })
  t.end()
})

//   durations //

// ['March 7th-11th 1987', [2, 7, 1987]],
// ['June 1st-11th 1999', [5, 1, 1999]],
// ['28th of September to 5th of October 2008', [8, 28, 2008]],
// ['2nd of January to 5th of October 2008', [9, 5, 2008]],
// ['March 7th to june 11th 1987', [2, 7, 1987]],
// ['April 17th to september 11th 1981', [3, 17, 1981]],
// ['June 1st to June 11th 2014', [5, 1, 2014]],
// ['between 13 February and 15 February 1945', [1, 13, 1945]],
// ['between March 7th and june 11th 1987', [2, 7, 1987]],
// ['3rd - 5th of March 1969', [2, 3, 1969]],
// ["September 1939 to April 1945",  ["month":null,"day":null,"year":1939]],
// ["June 1969 to April 1975",  ["month":null,"day":null,"year":1969]],
// ["2014-1998",  ["month":null,"day":null,"year":null]],
