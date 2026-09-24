export default [
  // ==== Holiday ====
  { match: '#Holiday (day|eve)', hook: '#Holiday', tag: 'Holiday', reason: 'holiday-day' },
  //5th of March
  { match: '#Value of #Month', hook: 'of', tag: 'Date', reason: 'value-of-month' },
  //5 March
  { match: '#Cardinal #Month', hook: '#Month', tag: 'Date', reason: 'cardinal-month' },
  //march 5 to 7
  { match: '#Month #Value to #Value', hook: 'to', tag: 'Date', reason: 'value-to-value' },
  //march the 12th
  { match: '#Month the #Value', hook: 'the', tag: 'Date', reason: 'month-the-value' },
  //june 7
  { match: '(#WeekDay|#Month) #Value', hook: '#Value', tag: 'Date', reason: 'date-value' },
  //7 june
  { match: '#Value (#WeekDay|#Month)', hook: '#Value', tag: 'Date', reason: 'value-date' },
  //may twenty five
  { match: '(#TextValue && #Date) #TextValue', hook: '#TextValue', tag: 'Date', reason: 'textvalue-date' },
  // 'aug 20-21'
  { match: `#Month #NumberRange`, hook: '#NumberRange', tag: 'Date', reason: 'aug 20-21' },
  // wed march 5th
  { match: `#WeekDay #Month #Ordinal`, hook: '#Ordinal', tag: 'Date', reason: 'week mm-dd' },
  // aug 5th 2021
  { match: `#Month #Ordinal #Cardinal`, hook: '#Ordinal', tag: 'Date', reason: 'mm-dd-yyy' },

  // === timezones ===
  // china standard time
  { match: `(#Place|#Demonym) (standard|daylight|central|mountain)? time`, hook: 'time', tag: 'Timezone', reason: 'std-time' },
  // eastern time
  {
    match: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`, hook: 'time',
    tag: 'Timezone',
    reason: 'eastern-time',
  },
  // 5pm central
  { match: `#Time [(eastern|mountain|pacific|central|est|pst|gmt)]`, hook: '#Time', group: 0, tag: 'Timezone', reason: '5pm-central' },
  // central european time
  { match: `(central|western|eastern) european time`, hook: 'european', tag: 'Timezone', reason: 'cet' },
]
