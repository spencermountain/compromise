import test from 'tape'
import nlp from './_lib.js'
const here = '[paragraph/misc] '



test('paragraph-basic', function (t) {
  const str = `What's with these homies dissin' my girl? Why do they gotta front? 

What did we ever do to these guys that made them so violent?

Woo-hoo, but you know I'm yours.
Woo-hoo, and I know you're mine.
Woo-hoo, and that's for all time
  `

  const doc = nlp(str).paragraphs()

  t.equal(doc.length, 3, 'three-paragraphs')

  const m = doc.eq(0)
  t.equal(m.sentences().length, 2, 'two sentences in first paragraph')

  t.equal(doc.json().length, 3, 'three-json objects')

  const one = doc.filter(p => {
    return p.has('these guys')
  })
  t.equal(one.length, 1, 'filter-one')
  t.equal(/^What did we ever do /.test(one.text()), true, 'filter-text')

  t.end()
})



test('paragraph-tests', function (t) {
  const txt = `What's with these homies dissin' my girl? Why do they gotta front? What did we ever do to these guys that made them so violent?

Second paragraph! Oh yeah! my friends`

  const doc = nlp(txt)
  const res = doc.paragraphs()
  t.equal(res.found, true, here + 'found')
  t.equal(res.length, 2, here + 'length')

  // match
  const m = res.match('^what did')
  t.equal(m.length, 1, here + 'match')
  t.equal(m.growRight('. .').text(), 'What did we ever', here + 'match-text')

  t.equal(res.has('foo'), false, here + 'has')
  t.equal(res.has('my girl'), true, here + 'has2')
  t.equal(res.if('homies').length, 1, here + 'if')

  t.ok(res.first(), here + 'first')
  t.ok(res.last(), here + 'last')
  t.ok(res.terms(), here + 'terms')
  res.forEach(p => p.toUpperCase())
  t.equal(res.length, 2, here + 'forEach')
  const r = res.map(p => p.toLowerCase())
  t.equal(r.length, 2, here + 'map')

  t.end()
})
