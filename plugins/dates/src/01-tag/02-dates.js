const here = 'date-tagger'
//
const dateTagger = function(doc) {

  doc.match('(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)').match('#Noun').tag('Season', here)
  doc.match('(q1|q2|q3|q4)').tag('FinancialQuarter', here)
  doc.match('(this|next|last|current) quarter').tag('FinancialQuarter', here)
  doc.match('(this|next|last|current) season').tag('Season', here)

  if (doc.has('#Date')) {
    //friday to sunday
    doc.match('#Date #Preposition #Date').tag('Date', here);
    //once a day..
    doc.match('(once|twice) (a|an|each) #Date').tag('Date', here);
    //TODO:fixme
    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date', here);
    //tuesday
    doc.match('#Date+').tag('Date', here);
    //by June
    doc.match('(by|until|on|in|at|during|over|every|each|due) the? #Date').tag('Date', here);
    //a year after..
    doc.match('a #Duration').tag('Date', here);
    //between x and y
    doc.match('(between|from) #Date').tag('Date', here);
    doc.match('(to|until|upto) #Date').tag('Date', here);
    doc.match('#Date and #Date').tag('Date', here);
    //during this june
    doc.match('(by|until|after|before|during|on|in|following) (next|this|last)? (#Date|#Date)').tag('Date', here);
    //day after next
    doc.match('the? #Date after next one?').tag('Date', here);
    //approximately...
    doc.match('(about|approx|approximately|around) #Date').tag('Date', here);
  }
  return doc
}
module.exports = dateTagger
