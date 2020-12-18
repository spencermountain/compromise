const normalize = function (doc) {
  doc = doc.clone()
  if (!doc.numbers) {
    console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'")
  } else {
    // convert 'two' to 2
    let num = doc.numbers()
    num.toNumber()
    num.toCardinal(false)
    // num.normalize()
  }
  // // expand 'aug 20-21'
  doc.contractions().expand()
  // // remove adverbs
  doc.adverbs().remove()
  // // 'week-end'
  doc.replace('week end', 'weekend').tag('Date')
  // // 'a up to b'
  doc.replace('up to', 'upto').tag('Date')
  // 'in a few years'
  let m = doc.match('in [a few] #Duration')
  if (m.found) {
    m.groups('0').replaceWith('2')
    m.tag('DateShift')
  }
  return doc
}
module.exports = normalize
