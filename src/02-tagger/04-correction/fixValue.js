//
const fixValue = function(doc) {
  let val = doc.if('#Value')
  if (val.found === true) {
    //three trains / one train
    let m = val.match('#Value #PresentTense')
    if (m.found) {
      if (m.has('(one|1)') === true) {
        m.terms(1).tag('Singular', 'one-presentTense')
      } else {
        m.terms(1).tag('Plural', 'value-presentTense')
      }
    }
    //money
    m = val.match('#Value+ #Currency')
    m.lastTerm().tag('Unit', 'money-unit')
    m.match('#Value+').tag('Money', 'value-currency')
  }

  return doc
}
module.exports = fixValue
