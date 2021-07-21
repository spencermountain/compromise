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

  nlp.typeahead(['lettuce', 'fettucini', 'falafel'], { min: 1 })
  t.equal(nlp('l').has('lettuce'), true, 'one-word-match')
  t.equal(nlp('t').has('lettuce'), false, 'one-word-nope')
  t.equal(nlp('f').has('lettuce'), false, 'one-word-collision')
  t.equal(nlp('fe').has('fettucini'), true, 'min-continue')
  t.end()
})

test('lexicon-guard test', function (t) {
  // 'swim' is it's own word.
  nlp.typeahead(['swimsuit'])
  t.equal(nlp('swim').has('swimsuit'), false, 'lexicon-block')
  t.equal(nlp('swimsu').has('swimsuit'), true, 'lexicon-continue')

  nlp('').world.prefixes = {} //whoosh!
  // who cares - do it anyways
  nlp.typeahead(['swimsuit'], { safe: false })
  t.equal(nlp('swim').has('swimsuit'), true, 'safemode-off')
  t.equal(nlp('swimsu').has('swimsuit'), true, 'lexicon-continue-2')
  t.end()
})

test('prefix layer test', function (t) {
  // layer-one, quite-greedy
  nlp.typeahead(['grey', 'gold', 'red'], { min: 2 })
  // layer-two, a little safer
  nlp.typeahead(['greyhound', 'goldendoodle', 'poodle'], { min: 3 })

  t.equal(nlp('re').has('red'), true, '2-match')
  t.equal(nlp('po').has('poodle'), false, '2-match not found')

  t.equal(nlp('gr').has('grey'), true, '2-match-sneaky')
  t.equal(nlp('gre').has('grey') || nlp('gre').has('greyhound'), false, 'collision') // (collision of terms)
  t.equal(nlp('golde').has('goldendoodle'), true, 'long-match')
  t.end()
})

test('prefix layer test', function (t) {
  let words = {
    august: 'Month',
    september: 'Month',
  }
  nlp.typeahead(words, { min: 2, safe: false })
  let doc = nlp('on the 4th of septem')
  doc.autoFill()
  t.equal(doc.text(), 'on the 4th of september', 'autofill')
  t.end()
})

test('prefix false-positive test', function (t) {
  let words = {
    august: 'Month',
    september: 'Month',
  }
  nlp.typeahead(words, { min: 2, safe: false })
  let str = `i've got a feelin' that we're gonna get through`
  let doc = nlp(str)
  doc.autoFill()
  t.equal(doc.text(), str, 'contraction-safe')
  t.end()
})
