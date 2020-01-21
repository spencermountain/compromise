const here = 'shift-tagger'
//
const shiftTagger = function(doc) {
  if (doc.has('#Date')) {
    //two weeks before
    doc.match('#Cardinal #Duration (before|after)').tag('#DateShift', here)
    // in two weeks
    doc.match('in #Cardinal #Duration').tag('#DateShift', here)
    //two weeks and three days before
    doc.match('#Cardinal #Duration and? #DateShift').tag('#DateShift', here)
    // doc.match('#Cardinal #Duration and? #DateShift').tag('#DateShift', here)
  }
  return doc
}
module.exports = shiftTagger
