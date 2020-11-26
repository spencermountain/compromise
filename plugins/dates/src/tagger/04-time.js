const here = 'time-tagger'

//
const timeTagger = function (doc) {
  // iso
  // 2020-03-02T00:00:00.000Z
  doc.match('/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}/').tag('Date')
  // 03/02
  doc.match('/^[0-9]{2}/[0-9]{2}/').tag('Date').unTag('Value')
  // @6pm
  doc.match('/@[0-9]{1,2}/').tag('Time').unTag('AtMention')
  // quarter to seven (not march 5 to 7)
  if (doc.has('#Cardinal') && !doc.has('#Month')) {
    doc.match('(half|quarter|25|15|10|5) (past|after|to) #Cardinal').tag('Time', here)
  }
  //timezone
  if (doc.has('#Date')) {
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
