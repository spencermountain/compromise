export default [
  // ==== Holiday ====
  { match: '#Holiday (day|eve)', tag: 'Holiday', reason: 'holiday-day' },
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
  // 'aug 20-21'
  { match: `#Month #NumberRange`, tag: 'Date', reason: 'aug 20-21' },

  // === timezones ===
  // china standard time
  { match: `(#Place|#Demonmym|#Time) (standard|daylight|central|mountain)? time`, tag: 'Timezone', reason: 'std-time' },
  // eastern time
  {
    match: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`,
    tag: 'Timezone',
    reason: 'eastern-time',
  },
  // 5pm central
  { match: `#Time [(eastern|mountain|pacific|central|est|pst|gmt)]`, group: 0, tag: 'Timezone', reason: '5pm-central' },
  // central european time
  { match: `(central|western|eastern) european time`, tag: 'Timezone', reason: 'cet' },
]
