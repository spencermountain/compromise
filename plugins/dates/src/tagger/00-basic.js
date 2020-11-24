//ambiguous 'may' and 'march'
const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const thisNext = '(last|next|this|previous|current|upcoming|coming)' //2
const sections = '(start|end|middle|starting|ending|midpoint|beginning)' //2
const seasons = '(spring|summer|winter|fall|autumn)'

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (m, reason) => {
  if (m.found !== true) {
    return
  }
  let term = m.termList()[0]
  if (term) {
    let num = parseInt(term.clean, 10)
    if (num && num > 1000 && num < 3000) {
      m.tag('Year', reason)
    }
  }
}
//same, but for less-confident values
const tagYearSafe = (m, reason) => {
  if (m.found !== true) {
    return
  }
  let term = m.termList()[0]
  if (term) {
    let num = parseInt(term.clean, 10)
    if (num && num > 1900 && num < 2030) {
      m.tag('Year', reason)
    }
  }
}

const fixDates = function (doc) {
  doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night')
  doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm')

  //months:
  let month = doc.if('#Month')
  if (month.found === true) {
    //June 5-7th
    month.match(`#Month #Date+`).tag('Date', 'correction-numberRange')
    //5th of March
    month.match('#Value of #Month').tag('Date', 'value-of-month')
    //5 March
    month.match('#Cardinal #Month').tag('Date', 'cardinal-month')
    //march 5 to 7
    month.match('#Month #Value to #Value').tag('Date', 'value-to-value')
    //march the 12th
    month.match('#Month the #Value').tag('Date', 'month-the-value')
  }

  //months:
  let val = doc.if('#Value')
  if (val.found === true) {
    //june 7
    val.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value')

    //7 june
    val.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date')

    //may twenty five
    val.match('#TextValue #TextValue').if('#Date').tag('#Date', 'textvalue-date')

    //eg 'year'
    let duration = val.if('#Duration')
    if (duration.found === true) {
      //for 4 months
      duration.match('for #Value #Duration').tag('Date', 'for-x-duration')
      //two days before
      duration.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction')
      //for four days
      duration.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration')
      //two years old
      duration.match('#Value #Duration old').unTag('Date', 'val-years-old')
    }
  }

  //seasons
  let season = doc.if(seasons)
  if (season.found === true) {
    season.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season')
    season.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season')
    season.match(`${seasons} ${preps}? #Cardinal`).tag('Date', 'season-year')
  }

  //rest-dates
  let date = doc.if('#Date')
  if (date.found === true) {
    //june the 5th
    date.match('#Date the? #Ordinal').tag('Date', 'correction')
    //last month
    date.match(`${thisNext} #Date`).tag('Date', 'thisNext')
    //by 5 March
    date.match('due? (by|before|after|until) #Date').tag('Date', 'by')
    //next feb
    date.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb')
    //start of june
    date.match(`the? ${sections} of #Date`).tag('Date', 'section-of')
    //fifth week in 1998
    date.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in')
    //early in june
    date.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening')
    //tomorrow before 3
    date.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal')
    //saturday am
    date.match('#Date [(am|pm)]', 0).unTag('Verb').unTag('Copula').tag('Time', 'date-am')
    //feb to june
    date.match('#Date (#Preposition|to) #Date').ifNo('#Duration').tag('Date', 'date-prep-date')
  }

  //year/cardinal tagging
  let cardinal = doc.if('#Cardinal')
  if (cardinal.found === true) {
    let v = cardinal.match(`#Date #Value [#Cardinal]`, 0)
    tagYear(v, 'date-value-year')
    //scoops up a bunch
    v = cardinal.match(`#Date+ [#Cardinal]`, 0)
    tagYear(v, 'date-year')
    //feb 8 2018
    v = cardinal.match(`#Month #Value [#Cardinal]`, 0)
    tagYear(v, 'month-value-year')
    //feb 8 to 10th 2018
    v = cardinal.match(`#Month #Value to #Value [#Cardinal]`, 0)
    tagYear(v, 'month-range-year')
    //in 1998
    v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year) [#Cardinal]`, 0)
    tagYear(v, 'in-year')
    //q2 2009
    v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]', 0)
    tagYear(v, 'in-year')
    //2nd quarter 2009
    v = cardinal.match('#Ordinal quarter [#Cardinal]', 0)
    tagYear(v, 'in-year')
    //in the year 1998
    v = cardinal.match('the year [#Cardinal]', 0)
    tagYear(v, 'in-year')
    //it was 1998
    v = cardinal.match('it (is|was) [#Cardinal]', 0)
    tagYearSafe(v, 'in-year')
  }

  let time = doc.if('#Time')
  if (time.found === true) {
    //by 6pm
    time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time')
    //7 7pm
    time.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time')
    //2pm est
    time.match('#Time [(eastern|pacific|central|mountain)]', 0).tag('Date', 'timezone')
    //6pm est
    time.match('#Time [(est|pst|gmt)]', 0).tag('Date', 'timezone abbr')
  }

  return doc
}
module.exports = fixDates
