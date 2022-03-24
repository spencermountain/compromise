/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import spacetime from 'spacetime'

import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose('tagger')
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

process.env.DEBUG_DATE = true

const context = {
  // today: '1999-04-17',
  // today: [1999, 3, 12]
  timezone: 'Asia/Shanghai',
  // timezone: false
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let txt = ''
txt = 'on the day after next'
txt = 'next tuesday at 3pm'
txt = 'december seventh'
txt = '3pm-3:30'
txt = ' may to august 1996'
txt = 'last week of june'
txt = '3pm-5pm on june 5th'
txt = '3pm-5pm on june 5th'
txt = 'six in the morning'
txt = 'last week of july'
txt = 'a month from now'
txt = '8/10/2012 - 8/15/2012'
txt = '4 years or more'
txt = 'took 76 years to finish'
txt = 'exercise four to five days per week.'
txt = 'in a few years'
txt = 'today in PST'
txt = '4pm sharp on tuesday' //! <- expand issue
txt = '130pm' //! <- expand issue
txt = 'by september 5th'
txt = '1 year 9 months from now '
txt = 'lets meet 32 from now '
// txt = 'on april fools 2020 '

// console.log(nlp.model().one.lexicon['april fools'])

// txt = 'four thirty'
// txt = 'on april 22nd'
// txt = 'monday'

// let doc = nlp(txt).debug()
// let found = doc.dates(context).json()[0]
// console.log(found.dates)
// dates.forEach((date) => {
//   console.log('start: ', fmt(date.start))
//   console.log('  end: ', fmt(date.end))
// })

// console.log(nlp.parseMatch('#Value (year|month|week|day) and a half'))
let doc = nlp(txt).debug()
// doc.match('#Value (year|month|week|day) and a half').debug()
let m = doc.durations(context)
console.log(m.get())