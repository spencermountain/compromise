'use strict';
//ambiguous 'may' and 'march'
const preps = '(in|by|before|during|on|until|after|of|within|all)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
const seasons = '(spring|summer|winter|fall|autumn)';

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (v, reason) => {
  if (v.found !== true) {
    return;
  }
  v.list.forEach((ts) => {
    let num = parseInt(ts.terms[0].normal, 10);
    if (num && num > 1000 && num < 3000) {
      ts.terms[0].tag('Year', reason);
    }
  });
};
//same, but for less-confident values
const tagYearSafer = (v, reason) => {
  if (v.found !== true) {
    return;
  }
  v.list.forEach((ts) => {
    let num = parseInt(ts.terms[0].normal, 10);
    if (num && num > 1900 && num < 2030) {
      ts.terms[0].tag('Year', reason);
    }
  });
};

//non-destructively tag values & prepositions as dates
const datePass = function (ts) {
  //ambiguous month - person forms
  let people = '(january|april|may|june|summer|autumn|jan|sep)';
  if (ts.has(people)) {
    //give to april
    ts.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) ${people}`).lastTerm().tag('Person', 'ambig-person');
    //remind june
    ts.match(`#Infinitive ${people}`).lastTerm().tag('Person', 'infinitive-person');
    //may waits for
    ts.match(`${people} #PresentTense (to|for)`).firstTerm().tag('Person', 'ambig-active');
    //april will
    ts.match(`${people} #Modal`).firstTerm().tag('Person', 'ambig-modal');
    //would april
    ts.match(`#Modal ${people}`).lastTerm().tag('Person', 'modal-ambig');
    //with april
    ts.match(`(that|with|for) ${people}`).term(1).tag('Person', 'that-month');
    //it is may
    ts.match(`#Copula ${people}`).term(1).tag('Person', 'is-may');
    //may is
    ts.match(`${people} #Copula`).term(0).tag('Person', 'may-is');
    //april the 5th
    ts.match(`${people} the? #Value`).term(0).tag('Month', 'person-value');
    //wednesday april
    ts.match(`#Date ${people}`).term(1).tag('Month', 'correction-may');
    //may 5th
    ts.match(`${people} the? #Value`).firstTerm().tag('Month', 'may-5th');
    //5th of may
    ts.match(`#Value of ${people}`).lastTerm().tag('Month', '5th-of-may');
    //by april
    ts.match(`${preps} ${people}`).ifNo('#Holiday').term(1).tag('Month', 'preps-month');
    //this april
    ts.match(`(next|this|last) ${people}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'
  }
  //ambiguous month - verb-forms
  let verbs = '(may|march)';
  if (ts.has(verbs)) {
    //quickly march
    ts.match(`#Adverb ${verbs}`).lastTerm().tag('Infinitive', 'ambig-verb');
    ts.match(`${verbs} #Adverb`).lastTerm().tag('Infinitive', 'ambig-verb');
    //all march
    ts.match(`${preps} ${verbs}`).lastTerm().tag('Month', 'in-month');
    //this march
    ts.match(`(next|this|last) ${verbs}`).lastTerm().tag('Month', 'this-month');
    //with date
    ts.match(`${verbs} the? #Value`).firstTerm().tag('Month', 'march-5th');
    ts.match(`#Value of? ${verbs}`).lastTerm().tag('Month', '5th-of-march');
    //nearby
    ts.match(`[${verbs}] .? #Date`).lastTerm().tag('Month', 'march-and-feb');
    ts.match(`#Date .? [${verbs}]`).lastTerm().tag('Month', 'feb-and-march');

    if (ts.has('march')) {
      //march to
      ts.match('march (up|down|back|to|toward)').term(0).tag('Infinitive', 'march-to');
      //must march
      ts.match('#Modal march').term(1).tag('Infinitive', 'must-march');
    }

  }
  //sun 5th
  if (ts.has('sun')) {
    //sun feb 2
    ts.match('sun #Date').firstTerm().tag('WeekDay', 'sun-feb');
    //sun the 5th
    ts.match('sun the #Ordinal').tag('Date').firstTerm().tag('WeekDay', 'sun-the-5th');
    //the sun
    ts.match('#Determiner sun').lastTerm().tag('Singular', 'the-sun');
  }
  //sat, nov 5th
  if (ts.has('sat')) {
    //sat november
    ts.match('sat #Date').firstTerm().tag('WeekDay', 'sat-feb');
    //this sat
    ts.match(`${preps} sat`).lastTerm().tag('WeekDay', 'sat');
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
    //for 4 months
    ts.match('for #Value #Duration').tag('Date', 'for-x-duration');
    //values
    ts.match('#Value #Abbreviation').tag('Value', 'value-abbr');
    ts.match('a #Value').if('(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)').tag('Value', 'a-value');
    ts.match('(minus|negative) #Value').tag('Value', 'minus-value');
    ts.match('#Value grand').tag('Value', 'value-grand');
    // ts.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
    ts.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
    ts.match('(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion) and #Value').tag('Value', 'magnitude-and-value');
    ts.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value');
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
    //two years old
    ts.match('#Value #Duration old').unTag('Date', 'val-years-old');
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
    ts.match('#Date (#Preposition|to) #Date').tag('Date', 'date-prep-date');
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
    tagYear(v, 'date-value-year');
    //scoops up a bunch
    v = ts.match(`#Date+ #Cardinal`).lastTerm();
    tagYear(v, 'date-year');
    //feb 8 2018
    v = ts.match(`#Month #Value #Cardinal`).lastTerm();
    tagYear(v, 'month-value-year');
    //feb 8 to 10th 2018
    v = ts.match(`#Month #Value to #Value #Cardinal`).lastTerm();
    tagYear(v, 'month-range-year');
    //in 1998
    v = ts.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm();
    tagYear(v, 'in-year');
    //q2 2009
    v = ts.match('(q1|q2|q3|q4) [#Cardinal]');
    tagYear(v, 'in-year');
    //2nd quarter 2009
    v = ts.match('#Ordinal quarter [#Cardinal]');
    tagYear(v, 'in-year');
    //in the year 1998
    v = ts.match('the year [#Cardinal]');
    tagYear(v, 'in-year');

    //it was 1998
    v = ts.match('it (is|was) [#Cardinal]');
    tagYearSafer(v, 'in-year');
    //was 1998 and...
    v = ts.match(`#Cardinal !#Plural`).firstTerm();
    tagYearSafer(v, 'year-unsafe');
  }

  //another pass at dates..
  if (ts.has('#Date')) {
    //time:
    if (ts.has('#Time')) {
      ts.match('#Cardinal #Time').not('#Year').tag('Time', 'value-time');
      ts.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
      //2pm est
      ts.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
      ts.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
    }

    //fix over-greedy
    let date = ts.match('#Date+').splitOn('Clause');

    if (date.has('(#Year|#Time)') === false) {
      //12 february 12
      date.match('#Value (#Month|#Weekday) #Value').lastTerm().unTag('Date');
    }
  }

  return ts;
};

module.exports = datePass;
