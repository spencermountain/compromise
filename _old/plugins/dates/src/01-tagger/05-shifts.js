const here = 'shift-tagger'
//
const shiftTagger = function (doc) {
  if (doc.has('#Date')) {
    //'two days before'/ 'nine weeks frow now'
    doc.match('#Cardinal #Duration (before|after|ago|from|hence|back)').tag('DateShift', here)
    // in two weeks
    doc.match('in #Cardinal #Duration').tag('DateShift', here)
    // in a few weeks
    doc.match('in a (few|couple) of? #Duration').tag('DateShift', here)
    //two weeks and three days before
    doc.match('#Cardinal #Duration and? #DateShift').tag('DateShift', here)
    doc.match('#DateShift and #Cardinal #Duration').tag('DateShift', here)
    // 'day after tomorrow'
    doc.match('[#Duration (after|before)] #Date', 0).tag('DateShift', here)
    // in half an hour
    doc.match('in half (a|an) #Duration').tag('DateShift', here)
  }
  return doc
}
module.exports = shiftTagger
