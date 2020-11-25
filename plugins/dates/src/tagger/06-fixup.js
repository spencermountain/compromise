const here = 'fix-tagger'
//
const fixUp = function (doc) {
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
    // tomorrow's meeting
    d.match('(in|of|by|for)? (#Possessive && #Date)').unTag('Date', 'tomorrows meeting')

    let knownDate = '(yesterday|today|tomorrow)'
    if (d.has(knownDate)) {
      //yesterday 7
      d.match(`${knownDate} [#Value]$`).unTag('Date', 'yesterday-7')
      //7 yesterday
      d.match(`^[#Value] ${knownDate}$`, 0).unTag('Date', '7 yesterday')
      //friday yesterday
      d.match(`#WeekDay+ ${knownDate}$`).unTag('Date').lastTerm().tag('Date', 'fri-yesterday')

      // yesterday yesterday
      // d.match(`${knownDate}+ ${knownDate}$`)
      //   .unTag('Date')
      //   .lastTerm()
      //   .tag('Date', here)
      d.match(`(this|last|next) #Date ${knownDate}$`).unTag('Date').lastTerm().tag('Date', 'this month yesterday')
    }
    //tomorrow on 5
    d.match(`on #Cardinal$`).unTag('Date', here)
    //this tomorrow
    d.match(`this tomorrow`).terms(0).unTag('Date', 'this-tomorrow')
    //q2 2019
    d.match(`(q1|q2|q3|q4) #Year`).tag('Date', here)
    //5 tuesday
    // d.match(`^#Value #WeekDay`).terms(0).unTag('Date');
    //5 next week
    d.match(`^#Value (this|next|last)`).terms(0).unTag('Date', here)

    if (d.has('(last|this|next)')) {
      //this month 7
      d.match(`(last|this|next) #Duration #Value`).terms(2).unTag('Date', here)
      //7 this month
      d.match(`!#Month #Value (last|this|next) #Date`).terms(0).unTag('Date', here)
    }
    //january 5 5
    if (d.has('(#Year|#Time|#TextValue|#NumberRange)') === false) {
      d.match('(#Month|#WeekDay) #Value #Value').terms(2).unTag('Date', here)
    }
    //between june
    if (d.has('^between') && !d.has('and .')) {
      d.unTag('Date', here)
    }
    //june june
    if (d.has('#Month #Month') && !d.has('@hasHyphen') && !d.has('@hasComma')) {
      d.match('#Month').lastTerm().unTag('Date', 'month-month')
    }
    // log the hours
    if (d.has('(minutes|seconds|weeks|hours|days|months)') && !d.has('#Value #Duration')) {
      d.match('(minutes|seconds|weeks|hours|days|months)').unTag('Date', 'log-hours')
    }
    // about thanksgiving
    if (d.has('about #Holiday')) {
      d.match('about').unTag('#Date', 'about-thanksgiving')
    }

    // a month from now
    d.match('(from|by|before) now').unTag('Time')
    // dangling date-chunks
    // if (d.has('!#Date (in|of|by|for) !#Date')) {
    //   d.unTag('Date', 'dangling-date')
    // }
    // the day after next
    d.match('#Date+').match('^the').unTag('Date')
  }
  return doc
}
module.exports = fixUp
