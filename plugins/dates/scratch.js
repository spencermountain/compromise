/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/three.js'
import spacetime from 'spacetime'
import datePlugin from './src/plugin.js'
nlp.plugin(datePlugin)
// nlp.verbose('tagger')
nlp.verbose('date')

const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

// process.env.DEBUG_DATE = true

// date issues:
// 'the month before christmas' vs 'a month before christmas'
// middle september
// end of september
// first half of march
// week of june 3rd
// fridays in june
// every saturday
// now
// until christmas

const context = {
  // today: '1999-04-17',
  // today: [2006, 8, 24],
  timezone: 'Asia/Shanghai',
  // dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let txt = ` We will see him in mid-September`
txt = `5th day of q1 2002`
// txt = `tomorrow at 5:45pm`
// txt = 'aug. 3'
// txt = 'lets meet 1 weeks from now '
// txt = 'on april fools 2020 '
// txt = 'four thirty'
// txt = 'on april 22nd'
txt = 'in basically one week from now'
txt = 'go shopping with april'
txt = 'between Sept and Oct 2008'
txt = 'only in 2018 and 2020'
txt = '2024/02/05 and 2024/03/09'
txt = 'in 03/28'
txt = 'in 28/28'
txt = '1 to 5 weeks ago'
txt = 'in 1 to 5 weeks'

// nlp.verbose('tagger')
let doc = nlp(txt).debug()
// doc.debug('dates')
// console.log(doc.dates().get())
// doc.times().format('24h')
// doc.debug()

// console.log(doc.times(context).json())
let found = doc.dates(context).json()
console.log(found[0].dates)
found.forEach((o) => {
  console.log('start: ', fmt(o.dates.start))
  console.log('  end: ', fmt(o.dates.end))
})

// let doc = nlp(txt).debug()
// let m = doc.dates(context)
// console.log(m.get())
