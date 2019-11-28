const here = 'section-tagger'
//
const sectionTagger = function(doc) {
  if (doc.has('#Date')) {
    // //next september
    doc.match('this? (last|next|past|this|previous|current|upcoming|coming|the) #Date').tag('Date', here);
    //starting this june
    doc.match('(starting|beginning|ending) #Date').tag('Date', here);
    //start of june
    doc.match('the? (start|end|middle|beginning) of (last|next|this|the) (#Date|#Date)').tag('Date', here);
    //this coming june
    doc.match('(the|this) #Date').tag('Date', here);
  }
  return doc
}
module.exports = sectionTagger
