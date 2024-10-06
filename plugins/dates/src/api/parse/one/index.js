// import spacetime from 'spacetime'
import tokenize from './01-tokenize/index.js'
import parse from './02-parse/index.js'
import transform from './03-transform/index.js'

const env = typeof process === 'undefined' || !process.env ? self.env || {} : process.env
const log = parts => {
  if (env.DEBUG_DATE) {
    // console.log(parts)// eslint-disable-line
    console.log(`\n==== '${parts.doc.text()}' =====`) // eslint-disable-line
    Object.keys(parts).forEach(k => {
      if (k !== 'doc' && parts[k]) {
        console.log(k, parts[k]) // eslint-disable-line
      }
    })
    parts.doc.debug() // allow
  }
}

const parseDate = function (doc, context) {
  //parse-out any sections
  let parts = tokenize(doc, context)
  doc = parts.doc
  // logger
  log(parts)

  //apply our given timezone
  if (parts.tz) {
    context = Object.assign({}, context, { timezone: parts.tz })
    // set timezone on any 'today' value, too
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
  // decide on a root date object
  let unit = parse(doc, context, parts)
  // apply all our parts
  unit = transform(unit, context, parts)
  return unit
}
export default parseDate
