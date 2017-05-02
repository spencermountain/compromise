'use strict';
//ambiguous 'may' and 'march'
const maybeMonth = '(may|march|jan|april|sep)';
const preps = '(in|by|before|for|during|on|until|after|of|within)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
const seasons = '(spring|summer|winter|fall|autumn)';

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (v, reason) => {
  v.list.forEach((ts) => {
    let num = parseInt(ts.terms[0].normal, 10);
    if (num && num > 1000 && num < 3000) {
      ts.terms[0].tag('Year', reason);
    }
  });
};
//same, but for less-confident values
const tagYearSafer = (v, reason) => {
  v.list.forEach((ts) => {
    let num = parseInt(ts.terms[0].normal, 10);
    if (num && num > 1990 && num < 2030) {
      ts.terms[0].tag('Year', reason);
    }
  });
};

//non-destructively tag values & prepositions as dates
const datePass = function (ts) {
  //ambiguous-months
  if (ts.has(maybeMonth)) {
    //april the 5th
    ts.match(`${maybeMonth} (#Determiner|#Value|#Date)`).term(0).tag('Month', 'correction-may');
    //wednesday april
    ts.match(`#Date ${maybeMonth}`).term(1).tag('Month', 'correction-may');
    //by april
    ts.match(`${preps} ${maybeMonth}`).term(1).tag('Month', 'correction-may');
    //this april
    ts.match(`(next|this|last) ${maybeMonth}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'
    //it is may
    ts.match('#Copula may').term(1).tag('Month', 'is-may');
    //march to
    ts.match('march (up|down|back|to|toward)').term(0).tag('Month', 'march-to');
  }
  //months:
  if (ts.has('#Month')) {
    //June 5-7th
    ts.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange');
    //5th of March
    ts.match('#Value of #Month').tag('Date', 'value-of-month');
    //5 March
    ts.match('#Cardinal #Month').tag('Date', 'cardinal-month');
    //march 5 to 7
    ts.match('#Month #Value to #Value').tag('Date', 'value-to-value');
    //march the 12th
    ts.match('#Month the #Value').tag('Date', 'month-the-value');
  }

  ts.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  ts.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');

  //months:
  if (ts.has('#Value')) {
    //values
    ts.match('#Value #Abbreviation').tag('Value', 'value-abbr');
    ts.match('a #Value').tag('Value', 'a-value');
    ts.match('(minus|negative) #Value').tag('Value', 'minus-value');
    ts.match('#Value grand').tag('Value', 'value-grand');
    // ts.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
    ts.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
    ts.match('(hundred|thousand|million|billion|trillion) and #Value').tag('Value', 'magnitude-and-value');
    ts.match('#Value point #Value').tag('Value', 'value-point-value');
    //for four days
    ts.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');
    ts.match('(#WeekDay|#Month) #Value').ifNo('#Money').tag('Date', 'date-value');
    ts.match('#Value (#WeekDay|#Month)').ifNo('#Money').tag('Date', 'value-date');
    //may twenty five
    let vs = ts.match('#TextValue #TextValue');
    if (vs.found && vs.has('#Date')) {
      vs.tag('#Date', 'textvalue-date');
    }
    //two days before
    ts.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');
  }

  //time:
  if (ts.has('#Time')) {
    ts.match('#Cardinal #Time').tag('Time', 'value-time');
    ts.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
    //2pm est
    ts.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
    ts.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  }

  //seasons
  if (ts.has(seasons)) {
    ts.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season');
    ts.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season');
  }

  //rest-dates
  if (ts.has('#Date')) {
    //june the 5th
    ts.match('#Date the? #Ordinal').tag('Date', 'correction-date');
    //last month
    ts.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
    //by 5 March
    ts.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
    //tomorrow before 3
    ts.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
    //saturday am
    ts.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
    ts.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
    ts.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');
    //start of june
    ts.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');
    //fifth week in 1998
    ts.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in-date');
    //early in june
    ts.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening');
  }

  //year/cardinal tagging
  if (ts.has('#Cardinal')) {
    let v = ts.match(`#Date #Value #Cardinal`).lastTerm();
    if (v.found) {
      tagYear(v, 'date-value-year');
    }
    //scoops up a bunch
    v = ts.match(`#Date+ #Cardinal`).lastTerm();
    if (v.found) {
      tagYear(v, 'date-year');
    }
    //feb 8 2018
    v = ts.match(`#Month #Value #Cardinal`).lastTerm();
    if (v.found) {
      tagYear(v, 'month-value-year');
    }
    //feb 8 to 10th 2018
    v = ts.match(`#Month #Value to #Value #Cardinal`).lastTerm();
    if (v.found) {
      tagYear(v, 'month-range-year');
    }
    //in 1998
    v = ts.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm();
    if (v.found) {
      tagYear(v, 'in-year');
    }
    //was 1998 and...
    v = ts.match(`#Cardinal !#Plural`).firstTerm();
    if (v.found) {
      tagYearSafer(v, 'year-unsafe');
    }
  }

  //fix over-greedy
  if (ts.has('#Date')) {
    let date = ts.match('#Date+').splitOn('Clause');

    if (date.has('(#Year|#Time)') === false) {
      //12 february 12
      date.match('#Value (#Month|#Weekday) #Value').lastTerm().unTag('Date');
    }
  }

  return ts;
};

module.exports = datePass;
