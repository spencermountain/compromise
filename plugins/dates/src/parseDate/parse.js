// const { Hour, Moment } = require('./units')
const tokens = {
  shift: require('./01-tokenize/01-shift'),
  counter: require('./01-tokenize/02-counter'),
  time: require('./01-tokenize/03-time'),
  relative: require('./01-tokenize/04-relative'),
  section: require('./01-tokenize/05-section'),
  timezone: require('./01-tokenize/06-timezone'),
}

const parse = {
  today: require('./02-parse/01-today'),
  holiday: require('./02-parse/02-holidays'),
  nextLast: require('./02-parse/03-next-last'),
  yearly: require('./02-parse/04-yearly'),
  explicit: require('./02-parse/05-explicit'),
}

const transform = {
  counter: require('./03-transform/addCounter'),
}

const parseDate = function (doc, context) {
  // quick normalization
  doc.match('[^the] !#Value', 0).remove() // keep 'the 17th'
  //parse-out any sections
  let shift = tokens.shift(doc)
  let counter = tokens.counter(doc)
  let tz = tokens.timezone(doc)
  let time = tokens.time(doc, context)
  let section = tokens.section(doc, context)
  let rel = tokens.relative(doc)
  //set our new timezone
  if (tz) {
    context = Object.assign({}, context, { timezone: tz })
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
  let unit = null
  //'in two days'
  unit = unit || parse.today(doc, context, { shift, time, rel })
  // 'this haloween'
  unit = unit || parse.holiday(doc, context)
  // 'this month'
  unit = unit || parse.nextLast(doc, context)
  // 'q2 2002'
  unit = unit || parse.yearly(doc, context)
  // 'this june 2nd'
  unit = unit || parse.explicit(doc, context)
  // doc.debug()
  if (!unit) {
    return null
  }

  // 2 days after..
  if (shift) {
    unit.applyShift(shift)
    // if (shift.hour || shift.minute || shift.second) {
    //   console.log(shift)
    //   unit = new Hour(unit.d, null, unit.context)
    // }
  }
  // this/next/last
  if (rel) {
    unit.applyRel(rel)
  }
  // end of
  if (section) {
    unit.applySection(section)
  }
  // at 5:40pm
  if (time) {
    unit.applyTime(time)
  }
  // apply counter
  if (counter && counter.unit) {
    unit = transform.counter(unit, counter)
  }
  // debugging
  // console.log('\n\n=-=-=-=-=-=-=-=-=-=-=-=Date-=-=-=-=-=-=-=-=-=-=-=-=-\n')
  // console.log(`  shift:      ${JSON.stringify(shift)}`)
  // console.log(`  counter:   `, counter)
  // console.log(`  rel:        ${rel || '-'}`)
  // console.log(`  section:    ${section || '-'}`)
  // console.log(`  time:       ${time || '-'}`)
  // console.log(`  str:       '${doc.text()}'`)
  // console.log('  unit:     ', unit, '\n')
  // doc.debug()
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')
  return unit
}
module.exports = parseDate
