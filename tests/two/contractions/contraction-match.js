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


