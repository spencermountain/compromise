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

let txt = ` We will see him in mid-September`
txt = `2012-06 -`
txt = `on the day after next -`
txt = `by the day after tomorrow -`
txt = `4pm-5 -`
txt = `today to next friday -`
txt = `ask june to sell off all my assets in tomorrow's meeting -`
txt = `the day after next -`
txt = `tomorrow early in the day -`
txt = `tomorrow late at night -`
txt = `March 7th-11th 1987 -`
txt = `in basically one week from now -`
txt = `5th day of q1 2002 -`
txt = `spring 1980`
txt = `tomorrow at 5:45pm`
// txt = 'aug. 3'
// txt = 'lets meet 1 weeks from now '
// txt = 'on april fools 2020 '
// txt = 'four thirty'
// txt = 'on april 22nd'
// txt = 'monday'

let doc = nlp(txt).debug()
// console.log(doc.times().get())
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