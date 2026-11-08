// 'twenty twenty-six' becomes one term '2026', so our view must shrink along with it
const toNumbers = function (doc, num) {
  const ptrs = doc.fullPointer
  if (ptrs.length !== 1) {
    num.toNumber()
    return doc
  }
  const [n, start, end] = ptrs[0]
  const size = doc.document[n].length
  num.toNumber()
  const removed = size - doc.document[n].length
  if (removed === 0) {
    return doc
  }
  // get a pointer with fresh term-ids, to follow any later changes
  const m = doc.update([[n, start, end - removed]])
  return m.update(m.fullPointer)
}

// shared cleanup for .dates() and .times() - see parse/normalize.js
const normalize = function (doc, opts = {}) {
  doc = doc.clone()

  if (opts.times) {
    // 'four thirty' -> 4:30
    const m = doc.match('#Time+').match('[<hour>#Cardinal] [<min>(thirty|fifteen)]')
    if (m.found) {
      const hour = m.groups('hour')
      const min = m.groups('min')
      const num = hour.values().get()[0]
      if (num > 0 && num <= 12) {
        const mins = min.values().get()[0]
        const str = `${num}:${mins}`
        m.replaceWith(str)
      }
    }
  }

  if (!doc.numbers) {
    console.warn(`Warning: compromise .numbers() not loaded.\n   This plugin requires compromise/three`) //eslint-disable-line
    return doc
  }
  // convert 'two' to 2
  const num = doc.numbers()
  doc = toNumbers(doc, num)
  // '2020's election' - the possessive isn't part of the year
  doc.match('#Year').possessives().strip()
  if (opts.times) {
    num.toCardinal(false)
  }

  // expand 'aug 20-21'
  if (doc.contractions) {
    doc.contractions().expand()
  }
  if (opts.times) {
    // remove adverbs
    doc.adverbs().remove()
  }
  // 'week-end'
  doc.replace('week end', 'weekend', true).tag('Date')
  // 'a up to b'
  doc.replace('up to', 'upto', true).tag('Date')
  // 'a year ago' - but leave 'half an hour' alone
  if (doc.has('once (a|an) #Duration') === false) {
    let m = doc.match('[(a|an)] #Duration', 0)
    const half = doc.match('half (a|an) #Duration').match('(a|an)')
    m = m.not(half)
    if (m.found) {
      m.replaceWith('1', { tags: true }).compute('lexicon')
    }
  }
  // jan - feb  (but leave 'utc-5' alone)
  doc.match('@hasDash').ifNo('#Timezone').insertAfter('to').tag('Date')
  return doc
}
export default normalize
