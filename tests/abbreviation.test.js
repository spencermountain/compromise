const test = require('tape')
const nlp = require('./_lib')

test('abbreviations', function(t) {
  let doc = nlp(`mr. and Mrs. Kelly live on Shoreditch st.`)
  doc.abbreviations().stripPeriods()
  t.equal(doc.text(), 'mr and Mrs Kelly live on Shoreditch st.', 'no-periods')

  doc
    .abbreviations()
    .addPeriods()
    .addPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Kelly live on Shoreditch st.', 'one-period')

  t.end()
})
