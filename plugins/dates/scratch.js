import nlp from '../../src/three.js'
import spacetime from 'spacetime'

import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose(true)
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

process.env.DEBUG_DATE = true

const context = {
  today: '1999-04-17',
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
// txt = 'on april 22nd'
// txt = 'monday'

// let doc = nlp(txt).debug()
// let found = doc.dates(context).json()[0]
// console.log(found.dates)
// dates.forEach((date) => {
//   console.log('start: ', fmt(date.start))
//   console.log('  end: ', fmt(date.end))
// })

let doc = nlp(txt).debug()
let m = doc.dates(context)
console.log(m.get())