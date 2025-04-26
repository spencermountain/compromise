
const normalize = function (doc) {
  doc = doc.clone()
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

  if (!doc.numbers) {
    console.warn(`Warning: compromise .numbers() not loaded.\n   This plugin requires >= v14`) //eslint-disable-line
  } else {
    // doc.numbers().normalize()
    // convert 'two' to 2
    const num = doc.numbers()
    num.toNumber()
    num.toCardinal(false)
  }
  // expand 'aug 20-21'
  if (doc.contractions) {
    doc.contractions().expand()
  }
  // remove adverbs
  doc.adverbs().remove()
  // 'week-end'
  doc.replace('week end', 'weekend', true).tag('Date')
  // 'a up to b'
  doc.replace('up to', 'upto', true).tag('Date')
  // 'a year ago'
  if (doc.has('once (a|an) #Duration') === false) {
    doc.match('[(a|an)] #Duration', 0).replaceWith('1').compute('lexicon')
    // tagger(doc)
  }
  // 'in a few years'
  // m = doc.match('in [a few] #Duration')
  // if (m.found) {
  //   m.groups('0').replaceWith('2')
  //   tagger(doc)
  // }
  // jan - feb
  doc.match('@hasDash').insertAfter('to').tag('Date')
  return doc
}
export default normalize
