const tagIntervals = function (doc) {
  // every other week
  doc.match('every other #Duration').tag('Date', 'every-other')
  // every weekend
  doc.match('(every|any|each|a) (day|weekday|week day|weekend|weekend day)').tag('Date', 'any-weekday')
  // any-wednesday
  doc.match('(every|any|each|a) (#WeekDay)').tag('Date', 'any-wednesday')
  // any week
  doc.match('(every|any|each|a) (#Duration)').tag('Date', 'any-week')
}
module.exports = tagIntervals
