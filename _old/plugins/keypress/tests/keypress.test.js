const test = require('tape')
const nlp = require('./_lib')

test('keypress', function(t) {
  let a = nlp.keypress(`we're here, we're clear.`)
  t.equal(a.length, 1, 'first-time')
  t.equal(Object.keys(nlp._sentenceCache()).length, 1, 'first-time cache')

  let b = nlp.keypress(`we're here, we're clear. we don't want anymore bears.`)
  t.equal(b.length, 2, 'second-time')
  t.equal(Object.keys(nlp._sentenceCache()).length, 2, 'second-time cache')
  t.equal(a.length, 1, 'first-doc-unchanged')

  let c = nlp.keypress(`we're here, we're clear. we want more bears.`)
  t.equal(c.length, 2, 'third-time')
  t.equal(Object.keys(nlp._sentenceCache()).length, 2, 'third-time cache')

  t.end()
})

test('keypress tags cached', function(t) {
  let doc = nlp.keypress('ginger spice sang a song.', { 'ginger spice': '#SpiceGirl' })
  t.equal(doc.has('#SpiceGirl'), true, 'original-tag')

  doc = nlp.keypress('ginger spice sang a song. she was nice')
  t.equal(doc.has('#SpiceGirl'), true, 'cached-tag')

  t.end()
})

test('keypress cache-invalidate', function(t) {
  let str = `What's with these homies dissin' my girl? Why do they gotta front? 

  What did we ever do to these guys that made them so violent?
  
  Woo-hoo, but you know I'm yours.
  Woo-hoo, and I know you're mine.
  Woo-hoo, and that's for all time
  `
  let doc = nlp.keypress(str)
  t.equal(doc.length, 6, 'return 6 sentences')
  t.equal(Object.keys(nlp._sentenceCache()).length, 6, 'cached 6 sentences')

  doc = nlp.keypress(`Woo-hoo, and I know you're mine.`)
  t.equal(doc.length, 1, 'return 1 sentence')
  t.equal(Object.keys(nlp._sentenceCache()).length, 1, 'cached 1 sentence')

  nlp.clear()
  t.equal(Object.keys(nlp._sentenceCache()).length, 0, 'cached 0 sentences')
  t.end()
})
