import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/typeahead] '

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
  let doc = nlp('i went to bambrid', lexicon)
  let m = doc.match('bambridgeshire')
  t.equal(m.text(), 'bambrid', here + 'found partial')
  t.equal(m.text('implicit'), 'bambridgeshire', here + 'found full')

  // match by tag, too
  m = doc.match('#Town')
  t.equal(m.text(), 'bambrid', here + 'found partial')
  t.equal(m.text('implicit'), 'bambridgeshire', here + 'found full')

  doc = nlp('bamb')
  t.equal(doc.has('bambridgeshire'), true, here + 'found 4-letters')
  doc = nlp('bam')
  t.equal(doc.has('bambridgeshire'), false, here + 'not-found 3-letters')
  t.end()
})

test('collision test', function (t) {
  nlp.typeahead(['milan', 'milwaukee'], { min: 1, safe: false })
  t.equal(nlp('mil').has('(milan|milwaukee)'), false, here + 'collision')
  // t.equal(nlp('mila').has('milan'), true, 'no-collision-1')
  t.equal(nlp('milw').has('milwaukee'), true, here + 'no-collision-2')
  t.end()
})

test('min test', function (t) {
  nlp.typeahead(['toronto'], { min: 4 })
  t.equal(nlp('tor').has('toronto'), false, here + 'min-block')
  t.equal(nlp('toro').has('toronto'), true, here + 'min-continue')

  nlp.typeahead(['lettuce', 'fettucini', 'falafel'], { min: 1 })
  t.equal(nlp('l').has('lettuce'), true, here + 'one-word-match')
  t.equal(nlp('t').has('lettuce'), false, here + 'one-word-nope')
  t.equal(nlp('f').has('lettuce'), false, here + 'one-word-collision')
  t.equal(nlp('fe').has('fettucini'), true, here + 'min-continue')
  t.end()
})

test('lexicon-guard test', function (t) {
  // nlp.addWords({ swim: 'Infinitive' })
  // 'swim' is it's own word.
  nlp.typeahead(['swimsuit'])
  // t.equal(nlp('swim').has('swimsuit'), false, here + 'lexicon-block')
  t.equal(nlp('swimsu').has('swimsuit'), true, here + 'lexicon-continue')
  nlp.world().model.one.typeahead = {} //whoosh!
  // who cares - do it anyways
  nlp.typeahead(['swimsuit'], { safe: false })
  t.equal(nlp('swim').has('swimsuit'), true, here + 'safemode-off')
  t.equal(nlp('swimsu').has('swimsuit'), true, here + 'lexicon-continue-2')
  nlp.world().model.one.typeahead = {} //whoosh!
  t.end()
})

test('prefix layer test', function (t) {
  // layer-one, quite-greedy
  nlp.typeahead(['grey', 'gold', 'red'], { min: 2 })
  // layer-two, a little safer
  nlp.typeahead(['greyhound', 'goldendoodle', 'poodle'], { min: 3 })

  t.equal(nlp('re').has('red'), true, here + '2-match')
  t.equal(nlp('po').has('poodle'), false, here + '2-match not found')

  t.equal(nlp('gr').has('grey'), true, '2-match-sneaky')
  t.equal(nlp('gre').has('grey') || nlp('gre').has('greyhound'), false, here + 'collision') // (collision of terms)
  t.equal(nlp('golde').has('goldendoodle'), true, here + 'long-match')
  t.end()
})

test('prefix layer test', function (t) {
  const words = {
    august: 'Month',
    september: 'Month',
  }
  nlp.typeahead(words, { min: 2, safe: false })
  const doc = nlp('on the 4th of septem')
  doc.autoFill()
  t.equal(doc.text(), 'on the 4th of september', here + 'autofill')
  t.end()
})

test('prefix false-positive test', function (t) {
  const words = {
    august: 'Month',
    september: 'Month',
  }
  nlp.typeahead(words, { min: 2, safe: false })
  const str = `i've got a feelin' that we're gonna get through`
  const doc = nlp(str)
  doc.autoFill()
  t.equal(doc.text(), str, here + 'contraction-safe')
  t.end()
})
