const tagger = function(doc) {
  // addresses
  doc.match('#Value #Noun (st|street|rd|road|crescent|way)').tag('Address')
  // schools
  doc.match('#Noun+ (public|private) school').tag('School')
}
module.exports = tagger
