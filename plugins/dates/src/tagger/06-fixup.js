const here = 'fix-tagger'
//
const fixUp = function(doc) {

  //fixups
  if (doc.has('#Date')) {
    //first day by monday
    let oops = doc.match('#Date+ by #Date+');
    if (oops.found && !oops.has('^due')) {
      oops.match('^#Date+').unTag('Date', here);
    }

    let d = doc.match('#Date+');
    //'spa day'
    d.match('^day$').unTag('Date', here);

    let knownDate = '(yesterday|today|tomorrow)';
    if (d.has(knownDate)) {
      //yesterday 7
      d.match(`${knownDate} #Value$`).terms(1).unTag('Date', here);
      //7 yesterday
      d.match(`^#Value ${knownDate}$`).terms(0).unTag('Date', here);
      //friday yesterday
      d.match(`#WeekDay+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date', here);
      d.match(`${knownDate}+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date', here);
      d.match(`(this|last|next) #Date ${knownDate}$`).unTag('Date').lastTerm().tag('Date', here);
    }
    //tomorrow on 5
    d.match(`on #Cardinal$`).unTag('Date', here);
    //this tomorrow
    d.match(`this tomorrow`).terms(0).unTag('Date', here);
    //q2 2019
    d.match(`(q1|q2|q3|q4) #Year`).tag('Date', here);
    //5 tuesday
    // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
    //5 next week
    d.match(`^#Value (this|next|last)`).terms(0).unTag('Date', here);

    if (d.has('(last|this|next)')) {
      //this month 7
      d.match(`(last|this|next) #Duration #Value`).terms(2).unTag('Date', here);
      //7 this month
      d.match(`!#Month #Value (last|this|next) #Date`).terms(0).unTag('Date', here);
    }
    //january 5 5
    if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
      d.match('(#Month|#WeekDay) #Value #Value').terms(2).unTag('Date', here);
    }
    //between june
    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date', here);
    }
    //june june
    if (d.has('#Month #Month') && !d.has('#Hyphenated')) {
      d.match('#Month').lastTerm().unTag('Date', here);
    }

  }
  return doc
}
module.exports = fixUp
