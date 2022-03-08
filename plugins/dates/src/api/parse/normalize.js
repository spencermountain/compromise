const normalize = function (doc) {

  if (!doc.numbers) {
    console.warn(`\nCompromise warning: compromise/three must be used with compromise-dates plugin\n`) // eslint-disable-line
  }

  // normalize doc
  doc = doc.clone()
  doc.numbers().toNumber()

  // expand 'aug 20-21'
  doc.contractions().expand()

  // 'week-end'
  doc.replace('week end', 'weekend', true).tag('Date')
  // 'a up to b'
  doc.replace('up to', 'upto', true).tag('Date')
  // 'a year ago'
  if (doc.has('once (a|an) #Duration') === false) {
    doc.match('[(a|an)] #Duration', 0).replaceWith('1', { tags: true }).compute('lexicon')
  }
  // jan - feb
  doc.match('@hasDash').insertAfter('to').tag('Date')
  return doc
}

export default normalize