const here = 'fix-tagger'
//
const fixUp = function(doc) {
  //fixups
  if (doc.has('#Date')) {
    //first day by monday
    let oops = doc.match('#Date+ by #Date+')
    if (oops.found && !oops.has('^due')) {
      oops.match('^#Date+').unTag('Date', 'by-monday')
    }

    let d = doc.match('#Date+')
    //'spa day'
    d.match('^day$').unTag('Date', 'spa-day')

    let knownDate = '(yesterday|today|tomorrow)'
    if (d.has(knownDate)) {
      //yesterday 7
      d.match(`${knownDate} [#Value]$`).unTag('Date', 'yesterday-7')
      //7 yesterday
      d.match(`^[#Value] ${knownDate}$`).unTag('Date', '7 yesterday')
      //friday yesterday
      d.match(`#WeekDay+ ${knownDate}$`)
        .unTag('Date')
        .lastTerm()
        .tag('Date', 'fri-yesterday')

      // yesterday yesterday
      // d.match(`${knownDate}+ ${knownDate}$`)
      //   .unTag('Date')
      //   .lastTerm()
      //   .tag('Date', here)
      d.match(`(this|last|next) #Date ${knownDate}$`)
        .unTag('Date')
        .lastTerm()
        .tag('Date', 'this month yesterday')
    }
    //tomorrow on 5
    d.match(`on #Cardinal$`).unTag('Date', here)
    //this tomorrow
    d.match(`this tomorrow`)
      .terms(0)
      .unTag('Date', 'this-tomorrow')
    //q2 2019
    d.match(`(q1|q2|q3|q4) #Year`).tag('Date', here)
    //5 tuesday
    // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
    //5 next week
    d.match(`^#Value (this|next|last)`)
      .terms(0)
      .unTag('Date', here)

    if (d.has('(last|this|next)')) {
      //this month 7
      d.match(`(last|this|next) #Duration #Value`)
        .terms(2)
        .unTag('Date', here)
      //7 this month
      d.match(`!#Month #Value (last|this|next) #Date`)
        .terms(0)
        .unTag('Date', here)
    }
    //january 5 5
    if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
      d.match('(#Month|#WeekDay) #Value #Value')
        .terms(2)
        .unTag('Date', here)
    }
    //between june
    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date', here)
    }
    //june june
    if (d.has('#Month #Month') && !d.has('@hasHyphen') && !d.has('@hasComma')) {
      d.match('#Month')
        .lastTerm()
        .unTag('Date', 'month-month')
    }
  }
  return doc
}
module.exports = fixUp
