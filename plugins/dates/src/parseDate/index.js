const section = {
  shift: require('./getParts/01-shift'),
  time: require('./getParts/02-time'),
  relative: require('./getParts/03-relative'),
  timezone: require('./getParts/04-timezone'),
}

const steps = {
  implied: require('./steps/00-implied'),
  duration: require('./steps/01-duration'),
  holiday: require('./steps/02-holidays'),
  yearly: require('./steps/03-yearly'),
  firstLast: require('./steps/04-first-last'),
  explicit: require('./steps/05-explicit'),
}

const parseDate = function (doc, context) {
  //parse-out any sections
  let shift = section.shift(doc)
  let tz = section.timezone(doc)
  let time = section.time(doc, context)
  let rel = section.relative(doc)
  //set our new timezone
  if (tz) {
    context = Object.assign({}, context, { timezone: tz })
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
  let d = null
  //'in two days'
  d = d || steps.implied(doc, context, { shift, time, rel })
  // 'this month'
  d = d || steps.duration(doc, context)
  // 'this haloween'
  d = d || steps.holiday(doc, context)
  // 'q2 2002'
  d = d || steps.yearly(doc, context)
  // 'last week of 2002'
  d = d || steps.firstLast(doc, context)
  // 'this june 2nd'
  d = d || steps.explicit(doc, context)
  // console.log('\n\n=-=-=-=-=-=Date-=-=-=-=-=-=-')
  // console.log(`  shift:      ${JSON.stringify(shift)}`)
  // console.log(`  rel:        ${rel || '-'}`)
  // console.log(`  time:       ${time || '-'}`)
  // console.log(`\n  str:       '${doc.text()}'`)
  // console.log('\n     ', d)
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')

  if (!d) {
    return null
  }

  // // apply relative
  if (rel === 'last') {
    d.last()
  }
  if (rel === 'next') {
    d.next()
  }
  // apply shift
  if (shift) {
    d.applyShift(shift)
  }

  // apply time
  if (time) {
    d.applyTime(time)
  }

  return d
}
module.exports = parseDate
