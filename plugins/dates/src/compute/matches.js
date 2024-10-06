const preps = '(in|by|before|during|on|until|after|of|within|all)' //6
const thisNext = '(last|next|this|previous|current|upcoming|coming)' //2
const sections = '(start|end|middle|starting|ending|midpoint|beginning|mid)' //2
const seasons = '(spring|summer|winter|fall|autumn)'
const knownDate = '(yesterday|today|tomorrow)'

// { match: '', tag: '', reason:'' },
let matches = [
  // in the evening
  { match: 'in the (night|evening|morning|afternoon|day|daytime)', tag: 'Time', reason: 'in-the-night' },
  // 8 pm
  { match: '(#Value|#Time) (am|pm)', tag: 'Time', reason: 'value-ampm' },
  // 2012-06
  // { match: '/^[0-9]{4}-[0-9]{2}$/', tag: 'Date', reason: '2012-06' },
  // 30mins
  // { match: '/^[0-9]+(min|sec|hr|d)s?$/', tag: 'Duration', reason: '30min' },
  // misc weekday words
  { match: '(tue|thu)', tag: 'WeekDay', reason: 'misc-weekday' },
  //June 5-7th
  { match: `#Month #Date+`, tag: 'Date', reason: 'correction-numberRange' },
  //5th of March
  { match: '#Value of #Month', tag: 'Date', unTag: 'Time', reason: 'value-of-month' },
  //5 March
  { match: '#Cardinal #Month', tag: 'Date', reason: 'cardinal-month' },
  //march 5 to 7
  { match: '#Month #Value (and|or|to)? #Value+', tag: 'Date', reason: 'value-to-value' },
  //march the 12th
  { match: '#Month the #Value', tag: 'Date', reason: 'month-the-value' },
  // march to april
  { match: '[(march|may)] to? #Date', group: 0, tag: 'Month', reason: 'march-to' },
  // 'march'
  { match: '^(march|may)$', tag: 'Month', reason: 'single-march' },
  //March or June
  { match: '#Month or #Month', tag: 'Date', reason: 'month-or-month' },
  //june 7
  { match: '(#WeekDay|#Month) #Value', ifNo: '#Money', tag: 'Date', reason: 'date-value' },
  //7 june
  { match: '#Value (#WeekDay|#Month)', ifNo: '#Money', tag: 'Date', reason: 'value-date' },
  //may twenty five
  // { match: '#TextValue #TextValue', if: '#Date', tag: '#Date', reason: 'textvalue-date' },
  //two thursdays back
  { match: '#Value (#WeekDay|#Duration) back', tag: '#Date', reason: '3-back' },
  //for 4 months
  { match: 'for #Value #Duration', tag: 'Date', reason: 'for-x-duration' },
  //two days before
  { match: '#Value #Duration (before|ago|hence|back)', tag: 'Date', reason: 'val-duration-past' },
  //for four days
  { match: `${preps}? #Value #Duration`, tag: 'Date', reason: 'value-duration' },
  // 6-8 months
  { match: 'in? #Value to #Value #Duration time?', tag: 'Date', reason: '6-to-8-years' },
  //two years old
  { match: '#Value #Duration old', unTag: 'Date', reason: 'val-years-old' },
  //
  { match: `${preps}? ${thisNext} ${seasons}`, tag: 'Date', reason: 'thisNext-season' },
  //
  { match: `the? ${sections} of ${seasons}`, tag: 'Date', reason: 'section-season' },
  //
  { match: `${seasons} ${preps}? #Cardinal`, tag: 'Date', reason: 'season-year' },
  //june the 5th
  { match: '#Date the? #Ordinal', tag: 'Date', reason: 'correction' },
  //last month
  { match: `${thisNext} #Date`, tag: 'Date', reason: 'thisNext-date' },
  //by 5 March
  { match: 'due? (by|before|after|until) #Date', tag: 'Date', reason: 'by' },
  //next feb
  { match: '(last|next|this|previous|current|upcoming|coming|the) #Date', tag: 'Date', reason: 'next-feb' },
  //start of june
  { match: `#Preposition? the? ${sections} of #Date`, tag: 'Date', reason: 'section-of' },
  //fifth week in 1998
  { match: '#Ordinal #Duration in #Date', tag: 'Date', reason: 'duration-in' },
  //early in june
  { match: '(early|late) (at|in)? the? #Date', tag: 'Time', reason: 'early-evening' },
  //tomorrow before 3
  { match: '#Date [(by|before|after|at|@|about) #Cardinal]', group: 0, tag: 'Time', reason: 'date-before-Cardinal' },
  //feb to june
  { match: '#Date (#Preposition|to) #Date', ifNo: '#Duration', tag: 'Date', reason: 'date-prep-date' },
  //by 6pm
  { match: '(by|before|after|at|@|about) #Time', tag: 'Time', reason: 'preposition-time' },
  // in 20mins
  { match: '(in|after) /^[0-9]+(min|sec|wk)s?/', tag: 'Date', reason: 'shift-units' },
  //tuesday night
  { match: '#Date [(now|night|sometime)]', group: 0, tag: 'Time', reason: 'date-now' },
  // 4 days from now
  { match: '(from|starting|until|by) now', tag: 'Date', reason: 'for-now' },
  // every night
  { match: '(each|every) night', tag: 'Date', reason: 'for-now' },
  //saturday am
  { match: '#Date [(am|pm)]', group: 0, tag: 'Time', reason: 'date-am' },
  // mid-august
  { match: `[${sections}] #Date`, group: 0, tag: 'Date', reason: 'mid-sept' },

  //june 5 to 7th
  { match: '#Month #Value to #Value of? #Year?', tag: 'Date', reason: 'june 5 to 7th' },
  //5 to 7th june
  { match: '#Value to #Value of? #Month #Year?', tag: 'Date', reason: '5 to 7th june' },
  //third week of may
  { match: '#Value #Duration of #Date', tag: 'Date', reason: 'third week of may' },
  //two days after
  { match: '#Value+ #Duration (after|before|into|later|afterwards|ago)?', tag: 'Date', reason: 'two days after' },
  //two days
  { match: '#Value #Date', tag: 'Date', reason: 'two days' },
  //june 5th
  { match: '#Date #Value', tag: 'Date', reason: 'june 5th' },
  //tuesday at 5
  { match: '#Date #Preposition #Value', tag: 'Date', reason: 'tuesday at 5' },
  //tomorrow before 3
  { match: '#Date (after|before|during|on|in) #Value', tag: 'Date', reason: 'tomorrow before 3' },
  //a year and a half
  { match: '#Value (year|month|week|day) and a half', tag: 'Date', reason: 'a year and a half' },
  //5 and a half years
  { match: '#Value and a half (years|months|weeks|days)', tag: 'Date', reason: '5 and a half years' },
  //on the fifth
  { match: 'on the #Ordinal', tag: 'Date', reason: 'on the fifth' },
  // 'jan 5 or 8'
  { match: '#Month #Value+ (and|or) #Value', tag: 'Date', reason: 'date-or-date' },
  // 5 or 8 of jan
  { match: '#Value+ (and|or) #Value of #Month ', tag: 'Date', reason: 'date-and-date' },

  { match: '(spring|summer|winter|fall|autumn|springtime|wintertime|summertime)', tag: 'Season', reason: 'date-tag1' },
  { match: '(q1|q2|q3|q4)', tag: 'FinancialQuarter', reason: 'date-tag2' },
  { match: '(this|next|last|current) quarter', tag: 'FinancialQuarter', reason: 'date-tag3' },
  { match: '(this|next|last|current) season', tag: 'Season', reason: 'date-tag4' },
  //friday to sunday
  { match: '#Date #Preposition #Date', tag: 'Date', reason: 'friday to sunday' },
  //once a day..
  { match: '(once|twice) (a|an|each) #Date', tag: 'Date', reason: 'once a day' },
  //a year after..
  { match: 'a #Duration', tag: 'Date', reason: 'a year' },
  //between x and y
  { match: '(between|from) #Date', tag: 'Date', reason: 'between x and y' },
  { match: '(to|until|upto) #Date', tag: 'Date', reason: 'between x and y2' },
  { match: 'between #Date+ and #Date+', tag: 'Date', reason: 'between x and y3' },
  { match: '#Month and #Month #Year', tag: 'Date', reason: 'x and y4' },
  //day after next
  { match: 'the? #Date after next one?', tag: 'Date', reason: 'day after next' },
  //approximately...
  { match: '(about|approx|approximately|around) #Date', tag: 'Date', reason: 'approximately june' },

  // until june
  {
    match: '(by|until|on|in|at|during|over|every|each|due) the? #Date',
    ifNo: '#PhrasalVerb',
    tag: 'Date',
    reason: 'until june',
  },
  // until last june
  {
    match: '(by|until|after|before|during|on|in|following|since) (next|this|last)? #Date',
    ifNo: '#PhrasalVerb',
    tag: 'Date',
    reason: 'until last june',
  },

  //next september
  {
    match: 'this? (last|next|past|this|previous|current|upcoming|coming|the) #Date',
    tag: 'Date',
    reason: 'next september',
  },
  //starting this june
  { match: '(starting|beginning|ending) #Date', tag: 'Date', reason: 'starting this june' },
  //start of june
  { match: 'the? (start|end|middle|beginning) of (last|next|this|the) #Date', tag: 'Date', reason: 'start of june' },
  //this coming june
  { match: '(the|this) #Date', tag: 'Date', reason: 'this coming june' },
  //january up to june
  { match: '#Date up to #Date', tag: 'Date', reason: 'january up to june' },

  // 2 oclock
  { match: '#Cardinal oclock', tag: 'Time', reason: '2 oclock' },
  // // 13h30
  // { match: '/^[0-9]{2}h[0-9]{2}$/', tag: 'Time', reason: '13h30' },
  // // 03/02
  // { match: '/^[0-9]{2}/[0-9]{2}/', tag: 'Date', unTag: 'Value', reason: '03/02' },
  // 3 in the morning
  { match: '#Value (in|at) the? (morning|evening|night|nighttime)', tag: 'Time', reason: '3 in the morning' },
  // ten to seven
  {
    match: '(5|10|15|20|five|ten|fifteen|quarter|twenty|half) (after|past) #Cardinal',
    tag: 'Time',
    reason: 'ten to seven',
  }, //add check for 1 to 1 etc.
  // at 10 past
  {
    match: '(at|by|before) (5|10|15|20|five|ten|fifteen|twenty|quarter|half) (after|past|to)',
    tag: 'Time',
    reason: 'at-20-past',
  },
  // iso  (2020-03-02T00:00:00.000Z)
  // { match: '/^[0-9]{4}[:-][0-9]{2}[:-][0-9]{2}T[0-9]/', tag: 'Time', reason: 'iso-time-tag' },
  // tuesday at 4
  { match: '#Date [at #Cardinal]', group: 0, ifNo: '#Year', tag: 'Time', reason: ' tuesday at 4' },
  // half an hour
  { match: 'half an (hour|minute|second)', tag: 'Date', reason: 'half an hour' },
  // in eastern time
  { match: '(in|for|by|near|at) #Timezone', tag: 'Date', reason: 'in eastern time' },
  // 3pm to 4pm
  { match: '#Time to #Time', tag: 'Date', reason: '3pm to 4pm' },
  // 4pm sharp
  { match: '#Time [(sharp|on the dot)]', group: 0, tag: 'Time', reason: '4pm sharp' },

  // around four thirty
  {
    match: '(at|around|near|#Date) [#Cardinal (thirty|fifteen) (am|pm)?]',
    group: 0,
    tag: 'Time',
    reason: 'around four thirty',
  },
  // four thirty am
  { match: '#Cardinal (thirty|fifteen) (am|pm)', tag: 'Time', reason: 'four thirty am' },
  // four thirty tomorrow
  { match: '[#Cardinal (thirty|fifteen)] #Date', group: 0, tag: 'Time', reason: 'four thirty tomorrow' },
  //anytime around 3
  { match: '(anytime|sometime) (before|after|near) [#Cardinal]', group: 0, tag: 'Time', reason: 'antime-after-3' },

  //'two days before'/ 'nine weeks frow now'
  {
    match: '(#Cardinal|a|an) #Duration (before|after|ago|from|hence|back)',
    tag: 'DateShift',
    reason: 'nine weeks frow now',
  },
  // in two weeks
  { match: 'in (around|about|maybe|perhaps)? #Cardinal #Duration', tag: 'DateShift', reason: 'in two weeks' },
  { match: 'in (a|an) #Duration', tag: 'DateShift', reason: 'in a week' },
  // an hour from now
  { match: '[(a|an) #Duration from] #Date', group: 0, tag: 'DateShift', reason: 'an hour from now' },
  // a month ago
  { match: '(a|an) #Duration ago', tag: 'DateShift', reason: 'a month ago' },
  // in half an hour
  { match: 'in half (a|an) #Duration', tag: 'DateShift', reason: 'in half an hour' },
  // in a few weeks
  { match: 'in a (few|couple) of? #Duration', tag: 'DateShift', reason: 'in a few weeks' },
  //two weeks and three days before
  // { match: '#Cardinal #Duration and? #DateShift', tag: 'DateShift', reason: 'three days before' },
  // { match: '#DateShift and #Cardinal #Duration', tag: 'DateShift', reason: 'date-shift' },
  // 'day after tomorrow'
  { match: '[#Duration (after|before)] #Date', group: 0, tag: 'DateShift', reason: 'day after tomorrow' },

  // july 3rd and 4th
  { match: '#Month #Ordinal and #Ordinal', tag: 'Date', reason: 'ord-and-ord' },
  // every other week
  { match: 'every other #Duration', tag: 'Date', reason: 'every-other' },
  // every weekend
  { match: '(every|any|each|a) (day|weekday|week day|weekend|weekend day)', tag: 'Date', reason: 'any-weekday' },
  // any-wednesday
  { match: '(every|any|each|a) (#WeekDay)', tag: 'Date', reason: 'any-wednesday' },
  // any week
  { match: '(every|any|each|a) (#Duration)', tag: 'Date', reason: 'any-week' },
  // wed nov
  { match: '[(wed|sat)] (#Month|#Year|on|between|during|from)', group: 0, tag: 'WeekDay', reason: 'wed' },
  //'spa day'
  { match: '^day$', unTag: 'Date', reason: 'spa-day' },
  // tomorrow's meeting
  { match: '(in|of|by|for)? (#Possessive && #Date)', unTag: 'Date', reason: 'tomorrows meeting' },
  //yesterday 7
  { match: `${knownDate} [#Value]$`, unTag: 'Date', group: 0, reason: 'yesterday-7' },
  //7 yesterday
  { match: `^[#Value] ${knownDate}$`, group: 0, unTag: 'Date', reason: '7 yesterday' },
  //friday yesterday
  // { match: `#WeekDay+ ${knownDate}$`, unTag: 'Date').lastTerm(, tag:'Date',  reason: 'fri-yesterday'},
  //tomorrow on 5
  { match: `on #Cardinal$`, unTag: 'Date', reason: 'on 5' },
  //this tomorrow
  { match: `[this] tomorrow`, group: 0, unTag: 'Date', reason: 'this-tomorrow' },
  //q2 2019
  { match: `(q1|q2|q3|q4) #Year`, tag: 'Date', reason: 'q2 2016' },
  //5 next week
  { match: `^[#Value] (this|next|last)`, group: 0, unTag: 'Date', reason: '4 next' },
  //this month 7
  { match: `(last|this|next) #Duration [#Value]`, group: 0, unTag: 'Date', reason: 'this month 7' },
  //7 this month
  { match: `[!#Month] #Value (last|this|next) #Date`, group: 0, unTag: 'Date', reason: '7 this month' },
  // over the years
  { match: '(in|over) the #Duration #Date+?', unTag: 'Date', reason: 'over-the-duration' },
  // second quarter of 2020
  { match: '#Ordinal quarter of? #Year', unTag: 'Fraction' },
  // a month from now
  { match: '(from|by|before) now', unTag: 'Time', tag: 'Date' },
  // 18th next month
  { match: '#Value of? (this|next|last) #Date', tag: 'Date' },
  // first half of march
  { match: '(first|initial|second|latter) half of #Month', tag: 'Date' },
]
export default matches
