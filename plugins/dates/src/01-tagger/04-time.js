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
  //timezone
  if (doc.has('#Date')) {
    // iso  (2020-03-02T00:00:00.000Z)
    doc.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/').tag('Time', here)
    // tuesday at 4
    doc.match('#Date [at #Cardinal]', 0).notIf('#Year').tag('Time', here)
    // half an hour
    doc.match('half an (hour|minute|second)').tag('Date', here)
    // in eastern time
    doc.match('(in|for|by|near|at) #Timezone').tag('Timezone', here)
    // 4pm sharp
    doc.match('#Time [(sharp|on the dot)]', 0).tag('Time', here)
    let m = doc.if('#NumberRange')
    // 3-4 on tuesday
    m.match('[#NumberRange+] (on|near|by|at)? #WeekDay', 0).tag('Time', '3-4-tuesday')
    // 3-4 on march 2nd
    m.match('[#NumberRange+] (on|near|by|at)? #Month #Value', 0).tag('Time', '3-4-mar-3')
    // 3-4pm
    m.match('[#NumberRange] to (#NumberRange && #Time)', 0).tag('Time', '3-4pm')
    // 3pm-5
    m.match('(#NumberRange && #Time) to [#NumberRange]', 0).tag('Time', '3pm-4')
    // from 4 to 5pm
    doc.match('from [#NumericValue] to #Time', 0).tag('Time', '4-to-5pm')
  }
  // around four thirty
  doc.match('(at|around|near) [#Cardinal (thirty|fifteen) (am|pm)?]', 0).tag('Time', here)
  return doc
}
module.exports = timeTagger
