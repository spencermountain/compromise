import nlp from '../_lib.js'
import spacetime from 'spacetime'

const label = (text, context, field) => {
  return `[${field}; today=${JSON.stringify(context.today)}; timezone=${context.timezone}] ${text}`
}

// Preserve the original start, end, and equivalence assertion contracts.
const checkStarts = (t, context, rows) => {
  rows.forEach(a => {
    const want = spacetime(a[1], context.timezone).startOf('day').format('iso-short')
    const doc = nlp(a[0])
    const json = doc.dates(context).json()[0] || { dates: {} }
    let start = json.dates.start
    if (start) {
      start = spacetime(start).format('iso-short')
    }
    t.equal(start, want, label(a[0], context, 'start'))
  })
}

const checkEnds = (t, context, rows) => {
  rows.forEach(a => {
    const want = spacetime(a[1], context.timezone).endOf('day').iso()
    const json = nlp(a[0]).dates(context).json()[0] || { dates: {} }
    t.equal(json.dates.end, want, label(a[0], context, 'end'))
  })
}

const fmt = str => spacetime(str).format('nice')

const checkRanges = (t, context, rows) => {
  rows.forEach(a => {
    const left = nlp(a[0]).dates(context).json()[0] || {}
    if (!a[1]) {
      t.equal(left, undefined, label(a[0], context, 'no date'))
      return
    }
    const right = nlp(a[1]).dates(context).json()[0] || {}
    left.dates = left.dates || {}
    right.dates = right.dates || {}
    t.equal(fmt(left.dates.start), fmt(right.dates.start), label(a[0], context, 'start'))
    t.equal(fmt(left.dates.end), fmt(right.dates.end), label(a[0], context, 'end'))
  })
}

const checkEquivalent = (t, context, rows) => {
  rows.forEach(a => {
    const left = nlp(a[0]).dates(context).json()[0] || {}
    const right = nlp(a[1]).dates(context).json()[0] || {}
    left.dates = left.dates || {}
    right.dates = right.dates || {}
    t.equal(left.dates.start, right.dates.start, label(`${a[0]} -> ${a[1]}`, context, 'start'))
  })
}

export { checkStarts, checkEnds, checkRanges, checkEquivalent }
