//Dates: 'june' or 'may'
const ambig = require('../_ambig')
const dates = `(${ambig.personDate.join('|')})`

let list = [
  // ==== Holiday ====
  { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' }, // the captain who

  // ==== WeekDay ====
  // sun the 5th
  { match: '[sun] the #Ordinal', tag: 'WeekDay', reason: 'sun-the-5th' },
  //sun feb 2
  { match: '[sun] #Date', group: 0, tag: 'WeekDay', reason: 'sun-feb' },
  //1pm next sun
  { match: '#Date (on|this|next|last|during)? [sun]', group: 0, tag: 'WeekDay', reason: '1pm-sun' },
  //this sat
  { match: `(in|by|before|during|on|until|after|of|within|all) [sat]`, group: 0, tag: 'WeekDay', reason: 'sat' },
  { match: `(in|by|before|during|on|until|after|of|within|all) [wed]`, group: 0, tag: 'WeekDay', reason: 'wed' },
  { match: `(in|by|before|during|on|until|after|of|within|all) [march]`, group: 0, tag: 'Month', reason: 'march' },
  //sat november
  { match: '[sat] #Date', group: 0, tag: 'WeekDay', reason: 'sat-feb' },

  // ==== Month ====
  //all march
  { match: `#Preposition [(march|may)]`, group: 0, tag: 'Month', reason: 'in-month' },
  //this march
  { match: `this [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  { match: `next [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  { match: `last [(march|may)]`, group: 0, tag: 'Month', reason: 'this-month' },
  // march 5th
  { match: `[(march|may)] the? #Value`, group: 0, tag: 'Month', reason: 'march-5th' },
  // 5th of march
  { match: `#Value of? [(march|may)]`, group: 0, tag: 'Month', reason: '5th-of-march' },
  // march and feb
  { match: `[(march|may)] .? #Date`, group: 0, tag: 'Month', reason: 'march-and-feb' },
  // feb to march
  { match: `#Date .? [(march|may)]`, group: 0, tag: 'Month', reason: 'feb-and-march' },
  //quickly march
  { match: `#Adverb [(march|may)]`, group: 0, tag: 'Verb', reason: 'quickly-march' },
  //march quickly
  { match: `[(march|may)] #Adverb`, group: 0, tag: 'Verb', reason: 'march-quickly' },

  //5th of March
  { match: '#Value of #Month', tag: 'Date', reason: 'value-of-month' },
  //5 March
  { match: '#Cardinal #Month', tag: 'Date', reason: 'cardinal-month' },
  //march 5 to 7
  { match: '#Month #Value to #Value', tag: 'Date', reason: 'value-to-value' },
  //march the 12th
  { match: '#Month the #Value', tag: 'Date', reason: 'month-the-value' },
  //june 7
  { match: '(#WeekDay|#Month) #Value', tag: 'Date', reason: 'date-value' },
  //7 june
  { match: '#Value (#WeekDay|#Month)', tag: 'Date', reason: 'value-date' },
  //may twenty five
  { match: '(#TextValue && #Date) #TextValue', tag: 'Date', reason: 'textvalue-date' },

  // in june
  { match: `in [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `during [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `on [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  { match: `by [${dates}]`, group: 0, tag: 'Date', reason: 'by-june' },
  { match: `after [${dates}]`, group: 0, tag: 'Date', reason: 'after-june' },
  { match: `#Date [${dates}]`, group: 0, tag: 'Date', reason: 'in-june' },
  // june 1992
  { match: `${dates} #Value`, tag: 'Date', reason: 'june-5th' },
  { match: `${dates} #Date`, tag: 'Date', reason: 'june-5th' },
  // June Smith
  { match: `${dates} #ProperNoun`, tag: 'Person', reason: 'june-smith', safe: true },
  // june m. Cooper
  { match: `${dates} #Acronym? (#ProperNoun && !#Month)`, tag: 'Person', reason: 'june-smith-jr' },
  // 'second'
  { match: `#Cardinal [second]`, tag: 'Unit', reason: 'one-second' },
  // second quarter
  // { match: `#Ordinal quarter`, tag: 'Date', reason: 'second-quarter' },
  // 'aug 20-21'
  { match: `#Month #NumberRange`, tag: 'Date', reason: 'aug 20-21' },
]

module.exports = list
