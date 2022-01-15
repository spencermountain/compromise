import nlp from '../../src/three.js'
import spacetime from 'spacetime'

import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose(true)
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

const context = {
  today: '1999-04-17',
  // today: [1999, 3, 12]
  // timezone: 'Asia/Shanghai',
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let txt = ''
txt = 'next tuesday at 3pm'
txt = 'may to august 1996'
txt = '1:01pm'
txt = 'on april 22nd'


// let doc = nlp(txt).debug()
// let found = doc.dates(context).json()[0]
// console.log(found.dates)
// dates.forEach((date) => {
//   console.log('start: ', fmt(date.start))
//   console.log('  end: ', fmt(date.end))
// })

let doc = nlp(`on November 1st 2019 to june 8th`)
let m = doc.dates().format('{day} {month} {date-ordinal} {year}')
m.debug()