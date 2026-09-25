export default [
  // 5th of June
  { match: '#Value of #Month', hook: 'of', tag: 'Date', reason: 'value-of-month' },
  // 5 June
  { match: '#Cardinal #Month', hook: '#Month', tag: 'Date', reason: 'cardinal-month' },
  // June 5 to 7
  { match: '#Month #Value to #Value', hook: 'to', tag: 'Date', reason: 'value-to-value' },
  // June the 12th
  { match: '#Month the #Value', hook: 'the', tag: 'Date', reason: 'month-the-value' },
  // june 7
  { match: '(#WeekDay|#Month) #Value', hook: '#Value', tag: 'Date', reason: 'date-value' },
  // 7 june
  { match: '#Value (#WeekDay|#Month)', hook: '#Value', tag: 'Date', reason: 'value-date' },
  // aug 20-21
  { match: `#Month #NumberRange`, hook: '#NumberRange', tag: 'Date', reason: 'aug-20-21' },
  // Wednesday June 5th
  { match: `#WeekDay #Month #Ordinal`, hook: '#Ordinal', tag: 'Date', reason: 'weekday-month-ordinal' },
  // aug 5th 2021
  { match: `#Month #Ordinal #Cardinal`, hook: '#Ordinal', tag: 'Date', reason: 'month-day-year' },

  // === timezones ===
  // china standard time
  { match: `(#Place|#Demonym) (standard|daylight|central|mountain)? time`, hook: 'time', tag: 'Timezone', reason: 'standard-time' },
  // eastern time
  {
    match: `(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time`, hook: 'time',
    tag: 'Timezone',
    reason: 'eastern-time',
  },
  // 5pm [central]
  { match: `#Time [(eastern|mountain|pacific|central|est|pst|gmt)]`, hook: '#Time', group: 0, tag: 'Timezone', reason: '5pm-central' },
  // central european time
  { match: `(central|western|eastern) european time`, hook: 'european', tag: 'Timezone', reason: 'central-european-time' },
]
