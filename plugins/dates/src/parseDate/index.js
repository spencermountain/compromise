const tokens = {
  shift: require('./01-tokenize/01-shift'),
  counter: require('./01-tokenize/02-counter'),
  time: require('./01-tokenize/03-time'),
  relative: require('./01-tokenize/04-relative'),
  timezone: require('./01-tokenize/05-timezone'),
}

const parse = {
  implied: require('./02-parse/00-implied'),
  duration: require('./02-parse/01-next-last'),
  holiday: require('./02-parse/02-holidays'),
  yearly: require('./02-parse/03-yearly'),
  firstLast: require('./02-parse/_first-last'),
  explicit: require('./02-parse/05-explicit'),
}

const transform = {
  counter: require('./03-transform/counter'),
}

const parseDate = function (doc, context) {
  //parse-out any sections
  let shift = tokens.shift(doc)
  let counter = tokens.counter(doc)
  let tz = tokens.timezone(doc)
  let time = tokens.time(doc, context)
  let rel = tokens.relative(doc)
  //set our new timezone
  if (tz) {
    context = Object.assign({}, context, { timezone: tz })
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
  let unit = null
  //'in two days'
  unit = unit || parse.implied(doc, context, { shift, time, rel })
  // 'this month'
  unit = unit || parse.duration(doc, context)
  // 'this haloween'
  unit = unit || parse.holiday(doc, context)
  // 'q2 2002'
  unit = unit || parse.yearly(doc, context)
  // 'last week of 2002'
  unit = unit || parse.firstLast(doc, context)
  // 'this june 2nd'
  unit = unit || parse.explicit(doc, context)

  console.log('\n\n')
  doc.debug()
  console.log('=-=-=-=-=-=Date-=-=-=-=-=-=-')
  console.log(`  shift:      ${JSON.stringify(shift)}`)
  console.log(`  counter:   `, counter)
  console.log(`  rel:        ${rel || '-'}`)
  console.log(`  time:       ${time || '-'}`)
  console.log(`\n  str:       '${doc.text()}'`)
  console.log('\n     ', unit)
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')

  if (!unit) {
    return null
  }

  // // apply relative
  if (rel === 'last') {
    unit.last()
  }
  if (rel === 'next') {
    unit.next()
  }
  // apply shift
  if (shift) {
    unit.applyShift(shift)
  }
  // apply time
  if (time) {
    unit.applyTime(time)
  }
  // apply counter
  if (counter && counter.num) {
    unit = transform.counter(unit, counter)
  }

  return unit
}
module.exports = parseDate
