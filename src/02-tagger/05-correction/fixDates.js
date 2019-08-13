//ambiguous 'may' and 'march'
const preps = '(in|by|before|during|on|until|after|of|within|all)'
const thisNext = '(last|next|this|previous|current|upcoming|coming)'
const sections = '(start|end|middle|starting|ending|midpoint|beginning)'
const seasons = '(spring|summer|winter|fall|autumn)'
const people = '(january|april|may|june|summer|autumn|jan|sep)'
const verbs = '(may|march)'
const units = '(hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion)'

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

const fixDates = function(doc) {
  doc.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night')
  doc.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm')

  //ambiguous month - person forms
  let person = doc.if(people)
  if (person.found === true) {
    //give to april
    person.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${people}]`).tag('Person', 'ambig-person')
    //remind june
    person.match(`#Infinitive [${people}]`).tag('Person', 'infinitive-person')
    //may waits for
    person.match(`[${people}] #PresentTense (to|for)`).tag('Person', 'ambig-active')
    //april will
    person.match(`[${people}] #Modal`).tag('Person', 'ambig-modal')
    //would april
    person.match(`#Modal [${people}]`).tag('Person', 'modal-ambig')
    //with april
    person.match(`(that|with|for) [${people}]`).tag('Person', 'that-month')
    //it is may
    person.match(`#Copula [${people}]`).tag('Person', 'is-may')
    //may is
    person.match(`[${people}] #Copula`).tag('Person', 'may-is')
    //april the 5th
    person.match(`[${people}] the? #Value`).tag('Month', 'person-value')
    //wednesday april
    person.match(`#Date [${people}]`).tag('Month', 'correction-may')
    //may 5th
    person.match(`[${people}] the? #Value`).tag('Month', 'may-5th')
    //5th of may
    person.match(`#Value of [${people}]`).tag('Month', '5th-of-may')
    //by april
    person
      .match(`${preps} ${people}`)
      .ifNo('#Holiday')
      .term(1)
      .tag('Month', 'preps-month')
    //this april
    person.match(`(next|this|last) [${people}]`).tag('Month', 'correction-may') //maybe not 'this'
  }

  //ambiguous month - verb-forms
  let verb = doc.if(verbs)
  if (verb.found === true) {
    //quickly march
    verb
      .match(`#Adverb ${verbs}`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb')
    verb
      .match(`${verbs} #Adverb`)
      .lastTerm()
      .tag('Infinitive', 'ambig-verb')
    //all march
    verb
      .match(`${preps} ${verbs}`)
      .lastTerm()
      .tag('Month', 'in-month')
    //this march
    verb
      .match(`(next|this|last) ${verbs}`)
      .lastTerm()
      .tag('Month', 'this-month')
    //with date
    verb
      .match(`${verbs} the? #Value`)
      .firstTerm()
      .tag('Month', 'march-5th')
    verb
      .match(`#Value of? ${verbs}`)
      .lastTerm()
      .tag('Month', '5th-of-march')
    //nearby
    verb
      .match(`[${verbs}] .? #Date`)
      .lastTerm()
      .tag('Month', 'march-and-feb')
    verb
      .match(`#Date .? [${verbs}]`)
      .lastTerm()
      .tag('Month', 'feb-and-march')

    let march = doc.if('march')
    if (march.found === true) {
      //march to
      march.match('[march] (up|down|back|to|toward)').tag('Infinitive', 'march-to')
      //must march
      march.match('#Modal [march]').tag('Infinitive', 'must-march')
    }
  }
  //sun 5th
  let sun = doc.if('sun')
  if (sun.found === true) {
    //sun feb 2
    sun.match('[sun] #Date').tag('WeekDay', 'sun-feb')
    //sun the 5th
    sun
      .match('sun the #Ordinal')
      .tag('Date')
      .firstTerm()
      .tag('WeekDay', 'sun-the-5th')
    //the sun
    sun.match('#Determiner [sun]').tag('Singular', 'the-sun')
  }

  //sat, nov 5th
  let sat = doc.if('sat')
  if (sat.found) {
    //sat november
    sat.match('[sat] #Date').tag('WeekDay', 'sat-feb')
    //this sat
    sat.match(`${preps} [sat]`).tag('WeekDay', 'sat')
  }

  //months:
  let month = doc.if('#Month')
  if (month.found === true) {
    //June 5-7th
    month.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange')
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
    //values
    val.match('#Value #Abbreviation').tag('Value', 'value-abbr')
    //seven point five
    val.match('#Value (point|decimal) #Value').tag('Value', 'value-point-value')
    //minus 7
    val.match('(minus|negative) #Value').tag('Value', 'minus-value')
    // ten grand
    val.match('#Value grand').tag('Value', 'value-grand')
    //quarter million
    val.match('(a|the) [(half|quarter)] #Ordinal').tag('Value', 'half-ordinal')
    //june 7
    val
      .match('(#WeekDay|#Month) #Value')
      .ifNo('#Money')
      .tag('Date', 'date-value')

    //7 june
    val
      .match('#Value (#WeekDay|#Month)')
      .ifNo('#Money')
      .tag('Date', 'value-date')

    //may twenty five
    val
      .match('#TextValue #TextValue')
      .if('#Date')
      .tag('#Date', 'textvalue-date')

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
    //eg 'trillion'
    let mult = val.if(units)
    if (mult.found === true) {
      mult.match('a #Value').tag('Value', 'a-value')
      // mult.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
      mult.match(`${units} and #Value`).tag('Value', 'magnitude-and-value')
    }
  }

  //seasons
  let season = doc.if(seasons)
  if (season.found === true) {
    season.match(`${preps}? ${thisNext} ${seasons}`).tag('Date', 'thisNext-season')
    season.match(`the? ${sections} of ${seasons}`).tag('Date', 'section-season')
    season.match(`${seasons} #Cardinal`).tag('Date', 'season-year')
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
    date
      .match('#Date (by|before|after|at|@|about) #Cardinal')
      .not('^#Date')
      .tag('Time', 'date-before-Cardinal')
    //saturday am
    date
      .match('#Date [(am|pm)]')
      .unTag('Verb')
      .unTag('Copula')
      .tag('Time', 'date-am')
    //feb to june
    date
      .match('#Date (#Preposition|to) #Date')
      .ifNo('#Duration')
      .tag('Date', 'date-prep-date')
  }

  //year/cardinal tagging
  let cardinal = doc.if('#Cardinal')
  if (cardinal.found === true) {
    let v = cardinal.match(`#Date #Value [#Cardinal]`)
    tagYear(v, 'date-value-year')
    //scoops up a bunch
    v = cardinal.match(`#Date+ [#Cardinal]`)
    tagYear(v, 'date-year')
    //feb 8 2018
    v = cardinal.match(`#Month #Value [#Cardinal]`)
    tagYear(v, 'month-value-year')
    //feb 8 to 10th 2018
    v = cardinal.match(`#Month #Value to #Value [#Cardinal]`)
    tagYear(v, 'month-range-year')
    //in 1998
    v = cardinal.match(`(in|of|by|during|before|starting|ending|for|year) [#Cardinal]`)
    tagYear(v, 'in-year')
    //q2 2009
    v = cardinal.match('(q1|q2|q3|q4) [#Cardinal]')
    tagYear(v, 'in-year')
    //2nd quarter 2009
    v = cardinal.match('#Ordinal quarter [#Cardinal]')
    tagYear(v, 'in-year')
    //in the year 1998
    v = cardinal.match('the year [#Cardinal]')
    tagYear(v, 'in-year')
    //it was 1998
    v = cardinal.match('it (is|was) [#Cardinal]')
    tagYearSafe(v, 'in-year')
    //was 1998 and...
    v = cardinal.match(`[#Cardinal] !#Plural`)
    tagYearSafe(v, 'year-unsafe')
  }

  let time = doc.if('#Time')
  if (time.found === true) {
    //by 6pm
    time.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time')
    //7 7pm
    time
      .match('#Cardinal #Time')
      .not('#Year')
      .tag('Time', 'value-time')
    //2pm est
    time.match('#Time [(eastern|pacific|central|mountain)]').tag('Time', 'timezone')
    //6pm est
    time.match('#Time [(est|pst|gmt)]').tag('Time', 'timezone abbr')
  }

  return doc
}
module.exports = fixDates
