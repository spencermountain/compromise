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
  // quarter to seven (not march 5 to 7)
  if (doc.has('#Cardinal') && !doc.has('#Month')) {
    doc.match('1? (half|quarter|25|15|10|5) (past|after|to) #Cardinal').tag('Time', here)
  }
  //timezone
  if (doc.has('#Date')) {
    // iso  (2020-03-02T00:00:00.000Z)
    doc.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/').tag('Time', here)
    // tuesday at 4
    doc.match('#Date [at #Cardinal]', 0).notIf('#Year').tag('Time', here)
    // half an hour
    doc.match('half an (hour|minute|second)').tag('Date', here)
    //eastern daylight time
    doc.match('#Noun (standard|daylight|central|mountain)? time').tag('Timezone', here)
    //utc+5
    doc.match('/^utc[+-][0-9]/').tag('Timezone', here)
    doc.match('/^gmt[+-][0-9]/').tag('Timezone', here)

    doc.match('(in|for|by|near|at) #Timezone').tag('Timezone', here)
    // 2pm eastern
    doc.match('#Time [(eastern|mountain|pacific|central)]', 0).tag('Timezone', here)
  }
  return doc
}
module.exports = timeTagger
