const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const people = '(january|april|may|june|summer|autumn|jan|sep)' //ambiguous month-names
const verbs = '(may|march|sat)' //ambiguous month-verbs

const fixDates = function(doc) {
  //ambiguous month - person forms
  let person = doc.if(people)
  if (person.found === true) {
    //give to april
    person.match(`#Infinitive #Determiner? #Adjective? #Noun? (to|for) [${people}]`, 0).tag('Person', 'ambig-person')
    //remind june
    person.match(`#Infinitive [${people}]`, 0).tag('Person', 'infinitive-person')
    //may waits for
    person.match(`[${people}] #PresentTense (to|for)`, 0).tag('Person', 'ambig-active')
    //april will
    person.match(`[${people}] #Modal`, 0).tag('Person', 'ambig-modal')
    //would april
    person.match(`#Modal [${people}]`, 0).tag('Person', 'modal-ambig')
    //with april
    person.match(`(that|with|for) [${people}]`, 0).tag('Person', 'that-month')
    //it is may
    person.match(`#Copula [${people}]`, 0).tag('Person', 'is-may')
    //may is
    person.match(`[${people}] #Copula`, 0).tag('Person', 'may-is')
    //april the 5th
    person.match(`[${people}] the? #Value`, 0).tag('Month', 'person-value')
    //wednesday april
    person.match(`#Date [${people}]`, 0).tag('Month', 'correction-may')
    //may 5th
    person.match(`[${people}] the? #Value`, 0).tag('Month', 'may-5th')
    //5th of may
    person.match(`#Value of [${people}]`, 0).tag('Month', '5th-of-may')
    //by april
    person
      .match(`${preps} [${people}]`, 0)
      .ifNo('#Holiday')
      .tag('Month', 'preps-month')
    //this april
    person.match(`(next|this|last) [${people}]`, 0).tag('Month', 'correction-may') //maybe not 'this'
  }

  //ambiguous month - verb-forms
  let verb = doc.if(verbs)
  if (verb.found === true) {
    //quickly march
    verb.match(`#Adverb [${verbs}]`, 0).tag('Infinitive', 'ambig-verb')
    verb.match(`${verbs} [#Adverb]`, 0).tag('Infinitive', 'ambig-verb')
    //all march
    verb
      .match(`${preps} [${verbs}]`)
      .tag('Date', 'in-month')
      .match('(may|march)')
      .tag('Month')
    //this march
    verb
      .match(`(next|this|last) [${verbs}]`)
      .tag('Date', 'this-month')
      .match('(may|march)')
      .tag('Month')
    //with date
    verb
      .match(`[${verbs}] the? #Value`)
      .tag('Date', 'march-5th')
      .match('(may|march)')
      .tag('Month')
    verb
      .match(`#Value of? [${verbs}]`)
      .tag('Date', '5th-of-march')
      .match('(may|march)')
      .tag('Month')
    //nearby
    verb
      .match(`[${verbs}] .? #Date`)
      .tag('Date', 'march-and-feb')
      .match('(may|march)')
      .tag('Month')
    verb
      .match(`#Date .? [${verbs}]`)
      .tag('Date', 'feb-and-march')
      .match('(may|march)')
      .tag('Month')

    let march = doc.if('march')
    if (march.found === true) {
      //march to
      march.match('[march] (up|down|back|to|toward)', 0).tag('Infinitive', 'march-to')
      //must march
      march.match('#Modal [march]', 0).tag('Infinitive', 'must-march')
    }
  }
  //sun 5th
  let sun = doc.if('sun')
  if (sun.found === true) {
    //sun feb 2
    sun.match('[sun] #Date', 0).tag('WeekDay', 'sun-feb')
    //1pm next sun
    sun.match('#Date (on|this|next|last|during)? [sun]', 0).tag('WeekDay', '1pm-sun')
    //sun the 5th
    sun
      .match('sun the #Ordinal')
      .tag('Date')
      .firstTerm()
      .tag('WeekDay', 'sun-the-5th')
    //the sun
    sun.match('#Determiner [sun]', 0).tag('Singular', 'the-sun')
  }

  //sat, nov 5th
  let sat = doc.if('sat')
  if (sat.found) {
    //sat november
    sat.match('[sat] #Date', 0).tag('WeekDay', 'sat-feb')
    //this sat
    sat.match(`${preps} [sat]`, 0).tag('WeekDay', 'sat')
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
    val.match('(a|the) [(half|quarter)] #Ordinal', 0).tag('Value', 'half-ordinal')
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
  }

  return doc
}
module.exports = fixDates
