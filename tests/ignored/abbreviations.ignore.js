import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[three/abbreviation] '

test('abbreviations', function (t) {
  const doc = nlp(`mr. and Mrs. Kelly live on Shoreditch st. in Canada`)
  doc.abbreviations().stripPeriods()
  t.equal(doc.text(), 'mr and Mrs Kelly live on Shoreditch st in Canada', here + 'no-periods')

  doc.abbreviations().addPeriods().addPeriods()
  t.equal(doc.text(), 'mr. and Mrs. Kelly live on Shoreditch st. in Canada', here + 'one-period')

  t.end()
})

test('abbreviations', function (t) {
  const doc = nlp("i live on Main St. and it's fine.")
  doc.abbreviations().stripPeriods()
  t.equal(doc.text(), "i live on Main St and it's fine.", here + 'strip')
  doc.abbreviations().addPeriods()
  t.equal(doc.text(), "i live on Main St. and it's fine.", here + 'add')
  t.end()
})
