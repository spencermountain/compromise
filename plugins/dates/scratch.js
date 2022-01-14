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
  timezone: 'Asia/Shanghai',
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

// let doc = nlp('next tuesday at 3pm')
let doc = nlp('may to august 1996')
let found = doc.dates(context).json()[0]
console.log(found.dates)
// dates.forEach((date) => {
//   console.log('start: ', fmt(date.start))
//   console.log('  end: ', fmt(date.end))
// })
