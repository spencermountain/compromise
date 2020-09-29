const section = {
  shift: require('./sections/01-shift'),
  time: require('./sections/02-time'),
  relative: require('./sections/03-relative'),
  timezone: require('./sections/04-timezone'),
}

const steps = {
  implied: require('./steps/00-implied'),
  duration: require('./steps/01-duration'),
  holiday: require('./steps/02-holidays'),
  explicit: require('./steps/03-explicit'),
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
  // 'this june 2nd'
  d = d || steps.explicit(doc, context)
  // if (typeof process !== undefined && process && process.env.DEBUG) {
  // console.log('\n\n=-=-=-=-=-=Date-=-=-=-=-=-=-')
  // console.log(`  shift:      ${JSON.stringify(shift)}`)
  // console.log(`  rel:        ${rel || '-'}`)
  // console.log(`  time:       ${time || '-'}`)
  // console.log(`\n  str:       '${doc.text()}'`)
  // console.log('\n     ', d)
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')
  // }

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
  d.applyTime(time)

  return d
}
module.exports = parseDate
