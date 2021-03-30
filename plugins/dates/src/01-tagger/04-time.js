const here = 'time-tagger'

//
const timeTagger = function (doc) {
  // 2 oclock
  doc.match('#Cardinal oclock').tag('Time', here)
  // 13h30
  doc.match('/^[0-9]{2}h[0-9]{2}$/').tag('Time', here)
  // 03/02
  doc.match('/^[0-9]{2}/[0-9]{2}/').tag('Date', here).unTag('Value')
  // 3 in the morning
  doc.match('[#Value] (in|at) the? (morning|evening|night|nighttime)').tag('Time', here)
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
    //--time-ranges--
    // 4pm sharp
    date.match('#Time [(sharp|on the dot)]', 0).tag('Time', here)
    let range = date.if('#NumberRange')
    if (range.found) {
      // 3-4 on tuesday
      range.match('[#NumberRange+] (on|near|by|at)? #WeekDay', 0).tag('Time', '3-4-tuesday')
      // 3-4 on march 2nd
      range.match('[#NumberRange+] (on|near|by|at)? #Month #Value', 0).tag('Time', '3-4-mar-3')
      // 3-4pm
      range.match('[#NumberRange] to (#NumberRange && #Time)', 0).tag('Time', '3-4pm')
      // 3pm-5
      range.match('(#NumberRange && #Time) to [#NumberRange]', 0).tag('Time', '3pm-4')
    }

    // from 4 to 5 tomorrow
    date
      .match('(from|between) #Cardinal and #Cardinal (in|on)? (#WeekDay|tomorrow|yesterday)')
      .tag('Date', '4-to-5pm')
      .match('#NumericValue')
      .tag('Time', here)
    // from 4 to 5pm
    date.match('(from|between) [#NumericValue] (to|and) #Time', 0).tag('Time', '4-to-5pm')
    // wed from 3 to 4
    date
      .match('#Date from? (#Cardinal|#Time) to (#Cardinal|#Time)')
      .tag('Date', here)
      .match('#Cardinal')
      .tag('#Time', 'from 3')
    // 3 to 4 on wednesday
    date
      .match('(#Cardinal|#Time) to (#Cardinal|#Time) on? #Date')
      .tag('Date', here)
      .match('#Cardinal')
      .tag('#Time', 'from 3')
  }
  // around four thirty
  doc.match('(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]', 0).tag('Time', here)
  //anytime around 3
  doc.match('(anytime|sometime) (before|after|near) #Cardinal').tag('Date', 'antime-after-3').lastTerm().tag('Time')
  return doc
}
module.exports = timeTagger
