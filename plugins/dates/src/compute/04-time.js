const here = 'time-tagger'

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
  // 2 oclock
  doc.match('#Cardinal oclock').tag('Time', here)
  // 13h30
  doc.match('/^[0-9]{2}h[0-9]{2}$/').tag('Time', here)
  // 03/02
  doc.match('/^[0-9]{2}/[0-9]{2}/').tag('Date', here).unTag('Value')
  // 3 in the morning
  doc.match('#Value (in|at) the? (morning|evening|night|nighttime)').tag('Time', here)
  // 4-5pm
  // doc.match('/[0-9](am|pm)?-[0-9](am|pm)/').tag(['DateRange', 'Time'], '3-4pm')
  if (!doc.has('#Month')) {
    // ten to seven
    doc.match('(5|10|15|20|five|ten|fifteen|quarter|twenty|half) (to|after|past) #Cardinal').tag('Time', here) //add check for 1 to 1 etc.
    // at 10 past
    doc
      .match('(at|by|before) (5|10|15|20|five|ten|fifteen|twenty|quarter|half) (after|past|to)')
      .tag('Time', 'at-20-past')
  }
  let date = doc.if('#Date')
  if (date.found) {
    //--timezone--
    // iso  (2020-03-02T00:00:00.000Z)
    date.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/').tag('Time', here)
    // tuesday at 4
    date.match('#Date [at #Cardinal]', 0).notIf('#Year').tag('Time', here)
    // half an hour
    date.match('half an (hour|minute|second)').tag('Date', here)
    // in eastern time
    date.match('(in|for|by|near|at) #Timezone').tag('Timezone', here)
    // 3pm to 4pm
    date.match('#Time to #Time').tag('Date', here)
    // 4pm sharp
    date.match('#Time [(sharp|on the dot)]', 0).tag('Time', here)

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
  // around four thirty
  doc.match('(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]', 0).tag('Time', here)
  //anytime around 3
  doc.match('(anytime|sometime) (before|after|near) #Cardinal').tag('Date', 'antime-after-3').lastTerm().tag('Time')
  return doc
}
export default timeTagger
