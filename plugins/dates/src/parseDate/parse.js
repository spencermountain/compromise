const tokens = {
  shift: require('./01-tokenize/01-shift'),
  counter: require('./01-tokenize/02-counter'),
  time: require('./01-tokenize/03-time'),
  relative: require('./01-tokenize/04-relative'),
  timezone: require('./01-tokenize/05-timezone'),
}

const parse = {
  today: require('./02-parse/01-today'),
  holiday: require('./02-parse/02-holidays'),
  yearly: require('./02-parse/03-yearly'),
  nextLast: require('./02-parse/04-next-last'),
  explicit: require('./02-parse/05-explicit'),
}

const transform = {
  counter: require('./03-transform/addCounter'),
}

const parseDate = function (doc, context) {
  // quick normalization
  doc = doc.replace('^the', '')
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
  unit = unit || parse.today(doc, context, { shift, time, rel })
  // 'this haloween'
  unit = unit || parse.holiday(doc, context)
  // 'q2 2002'
  unit = unit || parse.yearly(doc, context)
  // 'this month'
  unit = unit || parse.nextLast(doc, context)
  // 'this june 2nd'
  unit = unit || parse.explicit(doc, context)
  // doc.debug()
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
  if (counter && counter.unit) {
    unit = transform.counter(unit, counter)
  }
  // debugging
  // console.log('\n\n=-=-=-=-=-=-=-=-=-=-=-=Date-=-=-=-=-=-=-=-=-=-=-=-=-\n')
  // console.log(`  shift:      ${JSON.stringify(shift)}`)
  // console.log(`  counter:   `, counter)
  // console.log(`  rel:        ${rel || '-'}`)
  // console.log(`  time:       ${time || '-'}`)
  // console.log(`  str:       '${doc.text()}'`)
  // console.log('  unit:     ', unit, '\n')
  // doc.debug()
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')
  return unit
}
module.exports = parseDate
