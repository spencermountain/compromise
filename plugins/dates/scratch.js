import nlp from '../../src/three.js'
import spacetime from 'spacetime'

import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose(true)
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

const context = {
  // today: '2021-04-17',
  // timezone: 'Asia/Shanghai',
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let txt = ''
txt = 'june 3 2019'

let doc = nlp(txt)//.debug()
let dates = doc.dates(context)
dates = dates.get()
dates.forEach((date) => {
  console.log('start: ', fmt(date.start))
  console.log('  end: ', fmt(date.end))
})
