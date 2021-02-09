const normalize = function (doc) {
  doc = doc.clone()

  // 'four thirty' -> 4:30
  let m = doc.match('[<hour>#Cardinal] [<min>(thirty|fifteen)]').match('#Time+')
  if (m.found) {
    let hour = m.groups('hour')
    let min = m.groups('min')
    let num = hour.values().get(0)
    if (num > 0 && num >= 12) {
      let mins = min.values().get(0)
      let str = `${num}:${mins}`
      m.replaceWith(str)
    }
  }

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
  m = doc.match('in [a few] #Duration')
  if (m.found) {
    m.groups('0').replaceWith('2')
    m.tag('DateShift')
  }

  return doc
}
module.exports = normalize
