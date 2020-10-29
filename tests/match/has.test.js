const test = require('tape')
const nlp = require('../_lib')

let arr = [
  ['five hundred feet', 'Value'],
  ['50 square feet', 'Value'],
  ['90 hertz', 'Value'],
  ['two books', 'Value'],
  ['two hundred', 'Value'],
  ['4 hundred and ten', 'Value'],
  ['4 and a half million', 'Value'],
  ['499 thousand', 'Value'],
  ['499', 'Value'],
  ['4,899', 'Value'],
  ['John Smith', 'Person'],
  ['dr. John Smith', 'Person'],
  ['John Smith jr.', 'Person'],
  ['John Jacob Smith', 'Person'],
  ['Jani K. Smith', 'Person'],
  ['asdfefs', 'Noun'],
  ['octopus', 'Noun'],
  ['tree', 'Noun'],
  ['i', 'Noun'],

  ['FBI', 'Organization'],
  ['F.B.I.', 'Organization'],
  ['Fun ltd.', 'Organization'],
  ['Fun co', 'Organization'],
  ['Smith & Rogers', 'Organization'],
  ['Google', 'Organization'],
  ['tuesday', 'Date'],
  ['february', 'Date'],
  ['february fifth', 'Date'],
  ['tuesday march 5th', 'Date'],
  ['tuesday march 5th, 2015', 'Date'],
]

test('has-test', function (t) {
  arr.forEach(function (a) {
    let doc = nlp(a[0])
    t.equal(doc.has('#' + a[1]), true, a[0])
  })
  t.end()
})
