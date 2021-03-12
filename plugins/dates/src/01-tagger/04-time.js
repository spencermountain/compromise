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
  if (doc.has('#Cardinal') && !doc.has('#Month')) {
    // quarter to seven (not march 5 to 7)
    doc.match('1? (half|quarter|25|15|10|5) (past|after|to) #Cardinal').tag('Time', here)
    // ten to seven
    doc.match('(5|10|15|20|five|ten|fifteen|20) (to|after|past) [<hour>#Cardinal]').tag('Time', here) //add check for 1 to 1 etc.
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
  }
  // around four thirty
  doc.match('(at|around|near) [#Cardinal (thirty|fifteen) (am|pm)?]', 0).tag('Time', here)
  return doc
}
module.exports = timeTagger
