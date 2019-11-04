const test = require('tape')
const nlp = require('./_lib')

test('misc dates', function(t) {
  let doc = nlp('my birthday is June 5th 1998')
  t.equal(doc.dates().length, 1, 'one-date')

  let json = doc.dates().json({ normal: true })
  t.equal(json[0].normal, 'june 5th 1998', 'date-normal')
  t.end()
})

test('date-tagger', function(t) {
  ;[
    ['june 2009', ['Month', 'Year']],
    ['june 5th 2009', ['Month', 'Date', 'Year']],
    ['q2 2009', ['Date', 'Year']],
    ['spring 1980', ['Date', 'Year']],
    ['summer of 1999', ['Date', 'Date', 'Year']],
    ['today', ['Date']],
    ['minute', ['Duration']],
    ['valentines day', ['Holiday', 'Holiday']],
    ['ash wednesday', ['Holiday', 'Holiday']],
  ].forEach(function(a) {
    let terms = nlp(a[0]).json(0).terms
    terms.forEach((term, i) => {
      let tag = a[1][i]
      let found = term.tags.some(tg => tg === tag)
      t.equal(found, true, term.text + ' ' + tag)
    })
  })
  t.end()
})
