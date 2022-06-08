
// 3-4 can be a time-range, sometimes
const tagTimeRange = function (m, reason) {
  if (m.found) {
    m.tag('Date', reason)
    let nums = m.numbers().lessThan(31).ifNo('#Year')
    nums.tag('#Time', reason)
  }
}

//
const timeTagger = function (doc) {

  let date = doc.if('#Date')
  if (date.found) {
    // ==time-ranges=
    //   --number-ranges--
    let range = date.if('#NumberRange')
    if (range.found) {
      // 3-4 on tuesday
      let m = range.match('[#NumberRange+] (on|by|at)? #WeekDay', 0)
      tagTimeRange(m, '3-4-tuesday')
      // 3-4 on march 2nd
      m = range.match('[#NumberRange+] (on|by|at)? #Month #Value', 0)
      tagTimeRange(m, '3-4 mar 3')
      // 3-4pm
      m = range.match('[#NumberRange] to (#NumberRange && #Time)', 0)
      tagTimeRange(m, '3-4pm')
      // 3pm-5
      m = range.match('(#NumberRange && #Time) to [#NumberRange]', 0)
      tagTimeRange(m, '3pm-4')
    }
    // from 4 to 5 tomorrow
    let m = date.match('(from|between) #Cardinal and #Cardinal (in|on)? (#WeekDay|tomorrow|yesterday)')
    tagTimeRange(m, 'from 9-5 tues')
    // 9 to 5 tomorrow
    m = doc.match('#Cardinal to #Cardinal (#WeekDay|tomorrow|yesterday)')
    tagTimeRange(m, '9-5 tues')
    // from 4 to 5pm
    m = date.match('(from|between) [#NumericValue] (to|and) #Time', 0).tag('Time', '4-to-5pm')
    tagTimeRange(m, 'from 9-5pm')
    // wed from 3 to 4
    m = date.match('(#WeekDay|tomorrow|yesterday) (from|between)? (#Cardinal|#Time) (and|to) (#Cardinal|#Time)')
    tagTimeRange(m, 'tues 3-5')
    // june 5 from 3 to 4
    m = date.match('#Month #Value+ (from|between) [<time>(#Cardinal|#Time) (and|to) (#Cardinal|#Time)]').group('time')
    tagTimeRange(m, 'sep 4 from 9-5')
    // 3pm to 4 on wednesday
    m = date.match('#Time to #Cardinal on? #Date')
    tagTimeRange(m, '3pm-4 wed')
    // 3 to 4pm on wednesday
    m = date.match('#Cardinal to #Time on? #Date')
    tagTimeRange(m, '3-4pm wed')
    // 3 to 4 on wednesday
    m = date.match('#Cardinal to #Cardinal on? (#WeekDay|#Month #Value)')
    tagTimeRange(m, '3-4 wed')
    // 3 to 4 pm
    // m = date.match('^#Cardinal to #Time')
    // tagTimeRange(m, '3 to 4pm')
  }
  return doc
}
export default timeTagger
