//ambiguous 'may' and 'march'
const preps = '(in|by|before|during|on|until|after|of|within|all)'
const thisNext = '(last|next|this|previous|current|upcoming|coming)'
const sections = '(start|end|middle|starting|ending|midpoint|beginning)'
const seasons = '(spring|summer|winter|fall|autumn)'

//ensure a year is approximately typical for common years
//please change in one thousand years
const tagYear = (v, reason) => {
  if (v.found !== true) {
    return
  }
  v.list.forEach(ts => {
    let num = parseInt(ts.terms[0].normal, 10)
    if (num && num > 1000 && num < 3000) {
      ts.terms[0].tag('Year', reason)
    }
  })
}
//same, but for less-confident values
const tagYearSafer = (v, reason) => {
  if (v.found !== true) {
    return
  }
  v.list.forEach(ts => {
    let num = parseInt(ts.terms[0].normal, 10)
    if (num && num > 1900 && num < 2030) {
      ts.terms[0].tag('Year', reason)
    }
  })
}

const fixDates = function(doc) {
  doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night')
  doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm')

  //ambiguous month - person forms
  let people = '(january|april|may|june|summer|autumn|jan|sep)'
  if (doc.has(people)) {
    //give to april
    doc.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${people}]`).tag('Person', 'ambig-person')
    //remind june
    doc.match(`#Infinitive [${people}]`).tag('Person', 'infinitive-person')
    //may waits for
    doc.match(`[${people}] #PresentTense (to|for)`).tag('Person', 'ambig-active')
    //april will
    doc.match(`[${people}] #Modal`).tag('Person', 'ambig-modal')
    //would april
    doc.match(`#Modal [${people}]`).tag('Person', 'modal-ambig')
    //with april
    doc.match(`(that|with|for) [${people}]`).tag('Person', 'that-month')
    //it is may
    doc.match(`#Copula [${people}]`).tag('Person', 'is-may')
    //may is
    doc.match(`[${people}] #Copula`).tag('Person', 'may-is')
    //april the 5th
    doc.match(`[${people}] the? #Value`).tag('Month', 'person-value')
    //wednesday april
    doc.match(`#Date [${people}]`).tag('Month', 'correction-may')
    //may 5th
    doc.match(`[${people}] the? #Value`).tag('Month', 'may-5th')
    //5th of may
    doc.match(`#Value of [${people}]`).tag('Month', '5th-of-may')
    //by april
    doc
      .match(`${preps} ${people}`)
      .ifNo('#Holiday')
      .term(1)
      .tag('Month', 'preps-month')
    //this april
    doc.match(`(next|this|last) [${people}]`).tag('Month', 'correction-may') //maybe not 'this'
  }

  //ambiguous month - verb-forms
  let verbs = '(may|march)'
  if (doc.has(verbs)) {
    //quickly march
    doc
      .match(`#Adverb ${verbs}`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb')
    doc
      .match(`${verbs} #Adverb`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb')
    //all march
    doc
      .match(`${preps} ${verbs}`)
      .lastTerm()
      .tag('Month', 'in-month')
    //this march
    doc
      .match(`(next|this|last) ${verbs}`)
      .lastTerm()
      .tag('Month', 'this-month')
    //with date
    doc
      .match(`${verbs} the? #Value`)
      .firstTerm()
      .tag('Month', 'march-5th')
    doc
      .match(`#Value of? ${verbs}`)
      .lastTerm()
      .tag('Month', '5th-of-march')
    //nearby
    doc
      .match(`[${verbs}] .? #Date`)
      .lastTerm()
      .tag('Month', 'march-and-feb')
    doc
      .match(`#Date .? [${verbs}]`)
      .lastTerm()
      .tag('Month', 'feb-and-march')

    if (doc.has('march')) {
      //march to
      doc.match('[march] (up|down|back|to|toward)').tag('Infinitive', 'march-to')
      //must march
      doc.match('#Modal [march]').tag('Infinitive', 'must-march')
    }
  }
  //sun 5th
  if (doc.has('sun')) {
    //sun feb 2
    doc.match('[sun] #Date').tag('WeekDay', 'sun-feb')
    //sun the 5th
    doc
      .match('sun the #Ordinal')
      .tag('Date')
      .firstTerm()
      .tag('WeekDay', 'sun-the-5th')
    //the sun
    doc.match('#Determiner [sun]').tag('Singular', 'the-sun')
  }
  //sat, nov 5th
  if (doc.has('sat')) {
    //sat november
    doc.match('[sat] #Date').tag('WeekDay', 'sat-feb')
    //this sat
    doc.match(`${preps} [sat]`).tag('WeekDay', 'sat')
  }

  //months:
  if (doc.has('#Month')) {
    //June 5-7th
    doc.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange')
    //5th of March
    doc.match('#Value of #Month').tag('Date', 'value-of-month')
    //5 March
    doc.match('#Cardinal #Month').tag('Date', 'cardinal-month')
    //march 5 to 7
    doc.match('#Month #Value to #Value').tag('Date', 'value-to-value')
    //march the 12th
    doc.match('#Month the #Value').tag('Date', 'month-the-value')
  }

  //months:
  if (doc.has('#Value')) {
    //for 4 months
    doc.match('for #Value #Duration').tag('Date', 'for-x-duration')
    //values
    doc.match('#Value #Abbreviation').tag('Value', 'value-abbr')
    //seven point five
    doc.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value')
    //for four days
    doc.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration')
    //two days before
    doc.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction')
    //two years old
    doc.match('#Value #Duration old').unTag('Date', 'val-years-old')
    //minus 7
    doc.match('(minus|negative) #Value').tag('Value', 'minus-value')
    // ten grand
    doc.match('#Value grand').tag('Value', 'value-grand')
    //quarter million
    doc.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal')

    doc
      .match('a #Value')
      .if('(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)')
      .tag('Value', 'a-value')
    // ts.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
    doc
      .match('(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion) and #Value')
      .tag('Value', 'magnitude-and-value')

    doc
      .match('(#WeekDay|#Month) #Value')
      .ifNo('#Money')
      .tag('Date', 'date-value')

    doc
      .match('#Value (#WeekDay|#Month)')
      .ifNo('#Money')
      .tag('Date', 'value-date')

    //may twenty five
    let vs = doc.match('#TextValue #TextValue')
    if (vs.found && vs.has('#Date')) {
      vs.tag('#Date', 'textvalue-date')
    }
  }

  //seasons
  if (doc.has(seasons)) {
    doc.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season')
    doc.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season')
  }

  //rest-dates
  if (doc.has('#Date')) {
    //june the 5th
    doc.match('#Date the? #Ordinal').tag('Date', 'correction-date')
    //last month
    doc.match(`${thisNext} #Date`).tag('Date', 'thisNext-date')
    //by 5 March
    doc.match('due? (by|before|after|until) #Date').tag('Date', 'by-date')
    //next feb
    doc.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb')
    //feb to june
    doc.match('#Date (#Preposition|to) #Date').tag('Date', 'date-prep-date')
    //start of june
    doc.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date')
    //fifth week in 1998
    doc.match('#Ordinal #Duration in #Date').tag('Date', 'duration-in-date')
    //early in june
    doc.match('(early|late) (at|in)? the? #Date').tag('Time', 'early-evening')
    //tomorrow before 3
    doc
      .match('#Date (by|before|after|at|@|about) #Cardinal')
      .not('^#Date')
      .tag('Time', 'date-before-Cardinal')
    //saturday am
    doc
      .match('#Date [(am|pm)]')
      .unTag('Verb')
      .unTag('Copula')
      .tag('Time', 'date-am')
  }

  //year/cardinal tagging
  if (doc.has('#Cardinal')) {
    //TODO: uncomment
    // let v = doc.match(`#Date #Value #Cardinal`).lastTerm()
    // tagYear(v, 'date-value-year')
    // //scoops up a bunch
    // v = doc.match(`#Date+ #Cardinal`).lastTerm()
    // tagYear(v, 'date-year')
    // //feb 8 2018
    // v = doc.match(`#Month #Value #Cardinal`).lastTerm()
    // tagYear(v, 'month-value-year')
    // //feb 8 to 10th 2018
    // v = doc.match(`#Month #Value to #Value #Cardinal`).lastTerm()
    // tagYear(v, 'month-range-year')
    // //in 1998
    // v = doc.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm()
    // tagYear(v, 'in-year')
    // //q2 2009
    // v = doc.match('(q1|q2|q3|q4) [#Cardinal]')
    // tagYear(v, 'in-year')
    // //2nd quarter 2009
    // v = doc.match('#Ordinal quarter [#Cardinal]')
    // tagYear(v, 'in-year')
    // //in the year 1998
    // v = doc.match('the year [#Cardinal]')
    // tagYear(v, 'in-year')
    // //it was 1998
    // v = doc.match('it (is|was) [#Cardinal]')
    // tagYearSafer(v, 'in-year')
    // //was 1998 and...
    // v = doc.match(`#Cardinal !#Plural`).firstTerm()
    // tagYearSafer(v, 'year-unsafe')
  }

  //another pass at dates..
  if (doc.has('#Date')) {
    //time:
    if (doc.has('#Time')) {
      //by 6pm
      doc.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time')
      //7 7pm
      doc
        .match('#Cardinal #Time')
        .not('#Year')
        .tag('Time', 'value-time')
      //2pm est
      doc
        .match('#Time (eastern|pacific|central|mountain)')
        .term(1)
        .tag('Time', 'timezone')
      //6pm est
      doc
        .match('#Time (est|pst|gmt)')
        .term(1)
        .tag('Time', 'timezone abbr')
    }
  }
}
module.exports = fixDates
