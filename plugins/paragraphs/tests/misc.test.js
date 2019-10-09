const test = require('tape')
const nlp = require('./_lib')

test('paragraph-basic', function(t) {
  let str = `What's with these homies dissin' my girl? Why do they gotta front? 

What did we ever do to these guys that made them so violent?

Woo-hoo, but you know I'm yours.
Woo-hoo, and I know you're mine.
Woo-hoo, and that's for all time
  `

  let doc = nlp(str).paragraphs()

  t.equal(doc.length, 3, 'three-paragraphs')

  let m = doc.eq(0)
  t.equal(m.sentences().length, 2, 'two sentences in first paragraph')

  t.equal(doc.json().length, 3, 'three-json objects')

  let one = doc.filter(p => {
    return p.has('#Determiner guys')
  })
  t.equal(one.length, 1, 'filter-one')
  t.equal(/^What did we ever do /.test(one.text()), true, 'filter-text')

  t.end()
})
