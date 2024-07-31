import test from 'tape'
import nlp from '../_lib.js'
const h = '[two/contraction-match] '

test('half-contraction', function (t) {
  let doc = nlp(`before gonna after`)

  let found = doc.has('gonna')
  t.equal(found, true, h + 'full-text')

  found = doc.has('going to')
  t.equal(found, true, h + 'both words')

  found = doc.has('before going')
  t.equal(found, true, h + 'first half')

  found = doc.has('to after')
  t.equal(found, true, h + 'second half')

  t.end()
})


test('partial-contraction', function (t) {
  let doc = nlp(`we've walked`)
  let m = doc.match('we')
  t.equal(m.text('implicit'), 'we', h + 'one-half')

  m = doc.match('we\'ve')
  t.equal(m.text('implicit'), 'we have', h + 'both-halves')

  m = doc.match('we have')
  t.equal(m.text('implicit'), 'we have', h + 'two-halves')

  m = doc.match('have')
  t.equal(m.text('implicit'), 'have', h + 'second-half')

  m = doc.match('have walked')
  t.equal(m.text('implicit'), 'have walked', h + 'second-half+')

  m = doc.match('we\'ve walked')
  t.equal(m.text('implicit'), 'we have walked', h + 'both-halves+')

  m = doc.match('we walked')
  t.equal(m.text('implicit'), '', h + 'no-halves+')

  m = doc.match('we{2} have')
  t.equal(m.text('implicit'), '', h + 'invalid-first')

  m = doc.match('we* walked')
  t.equal(m.text('implicit'), '', h + 'invalid-greedy')

  m = doc.match('we+? walked')
  t.equal(m.text('implicit'), 'walked', h + 'half-but-optional')

  t.end()
})


test('contraction-skip', function (t) {
  let str = `We've matched`
  let doc = nlp(str)

  let m = doc.match(`we have matched`)
  t.equal(m.text(), str, h + 'both-words')

  m = doc.match(`we've matched`)
  t.equal(m.text(), str, h + 'contraction match')

  m = doc.match(`(we|i) have matched`)
  t.equal(m.text(), str, h + 'optional start')

  m = doc.match(`we (have|foo) matched`)
  t.equal(m.text(), str, h + 'optional end')

  m = doc.match(`. have matched`)
  t.equal(m.text(), str, h + 'dot start')

  m = doc.match(`we . matched`)
  t.equal(m.text(), str, h + 'dot end')

  m = doc.match(`@hasContraction matched`)
  t.equal(m.text(), str, h + '@hasContraction')

  t.end()
})


test('contraction-no-skip', function (t) {
  let doc = nlp(`We won't match`)
  let m = doc.match(`we will match`)
  t.equal(m.found, false, h + 'half-contraction')

  m = doc.match(`we (will|shall) match`)
  t.equal(m.found, false, h + 'half-contraction fast-or')

  m = doc.match(`we (will|foo bar) match`)
  t.equal(m.found, false, h + 'half-contraction slow-or')

  m = doc.match(`we will? match`)
  t.equal(m.found, false, h + 'half-contraction optional')

  m = doc.match(`we will+ match`)
  t.equal(m.found, false, h + 'half-contraction greedy')
  t.end()
})

test('multiple-contractions', function (t) {
  let doc = nlp(`everybody's creating, and they're going`)
  t.ok(doc.has('everybody is') && doc.has('they are'), `everybody's + they're`)

  doc = nlp(`spencer's walking to the store and she's mad`)
  t.ok(doc.has('spencer is') && doc.has('she is'), `spencer's + she's`)

  doc = nlp(`Somebody's going to see`)
  t.equal(doc.has('somebody is'), true, `Somebody's going`)

  doc = nlp(`Somebody's hat`)
  t.equal(doc.has('somebody is'), false, `Somebody's hat`)

  t.end()
})
