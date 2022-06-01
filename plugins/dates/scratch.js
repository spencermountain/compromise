/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import spacetime from 'spacetime'

import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose('tagger')
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

// process.env.DEBUG_DATE = true

const context = {
  // today: '1999-04-17',
  // today: [1999, 3, 12]
  // today: [2006, 8, 24],
  timezone: 'Asia/Shanghai',
  // timezone: false
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let txt = ''
txt = 'on the day after next'
txt = 'next tuesday at 3pm'
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
txt = '4pm sharp on tuesday'
txt = '130pm'
txt = 'three twenty'
txt = '2:45pm'
// txt = 'aug. 3'
// txt = 'lets meet 1 weeks from now '
// txt = 'on april fools 2020 '
// txt = 'four thirty'
// txt = 'on april 22nd'
// txt = 'monday'

let doc = nlp(txt).debug()

doc.times().format('24h')
doc.debug()

// console.log(doc.times(context).json())
// let found = doc.dates(context).json()
// console.log(found[0].dates)
// found.forEach((o) => {
//   console.log('start: ', fmt(o.dates.start))
//   console.log('  end: ', fmt(o.dates.end))
// })

// let doc = nlp(txt).debug()
// let m = doc.dates(context)
// console.log(m.get())