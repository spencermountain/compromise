const test = require('tape')
const nlp = require('./_lib')

test('typeahead test', function (t) {
  const lexicon = {
    bedfordshire: 'Town',
    aberdeenshire: 'Town',
    buckinghamshire: 'Town',
    argyllshire: 'Town',
    bambridgeshire: 'Town',
    cheshire: 'Town',
    ayrshire: 'Town',
  }
  // add the words we should predict from
  nlp.typeahead(lexicon, { min: 4 })
  // create a document
  let doc = nlp('i went to bucking', lexicon)
  let m = doc.match('buckinghamshire')
  t.equal(m.text(), 'bucking', 'found partial')
  t.equal(m.text('implicit'), 'buckinghamshire', 'found full')

  // match by tag, too
  m = doc.match('#Town')
  t.equal(m.text(), 'bucking', 'found partial')
  t.equal(m.text('implicit'), 'buckinghamshire', 'found full')

  doc = nlp('buck')
  t.equal(doc.has('buckinghamshire'), true, 'found 4-letters')
  doc = nlp('buc')
  t.equal(doc.has('buckinghamshire'), false, 'not-found 3-letters')
  t.end()
})

test('collision test', function (t) {
  nlp.typeahead(['milan', 'milwaukee'], { min: 1, safe: false })
  t.equal(nlp('mil').has('(milan|milwaukee)'), false, 'collision')
  // t.equal(nlp('mila').has('milan'), true, 'no-collision-1')
  t.equal(nlp('milw').has('milwaukee'), true, 'no-collision-2')
  t.end()
})

test('min test', function (t) {
  nlp.typeahead(['toronto'], { min: 4 })
  t.equal(nlp('tor').has('toronto'), false, 'min-block')
  t.equal(nlp('toro').has('toronto'), true, 'min-continue')
  t.end()
})

test('lexicon-guard test', function (t) {
  // 'swim' is it's own word.
  nlp.typeahead(['swimsuit'])
  t.equal(nlp('swim').has('swimsuit'), false, 'lexicon-block')
  t.equal(nlp('swimsu').has('swimsuit'), true, 'lexicon-continue')

  // who cares - do it anyways
  nlp.typeahead(['swimsuit'], { safe: false })
  t.equal(nlp('swim').has('swimsuit'), true, 'safemode-off')
  t.equal(nlp('swimsu').has('swimsuit'), true, 'lexicon-continue-2')
  t.end()
})
