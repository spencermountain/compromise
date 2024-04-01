import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/freeze]'

test('isFrozen() method', function (t) {
  let doc = nlp('the dr who is a a shoe in the closet')
  let m = doc.match('dr who').tag('Noun')
  m.freeze() // ☃️
  t.equal(doc.isFrozen().text(), 'dr who', here)
  doc.match('who').unfreeze()
  t.equal(doc.isFrozen().text(), 'dr', here)
  doc.unfreeze()
  t.equal(doc.isFrozen().text(), '', here)
  t.end()
})

test('cant tag frozen term', function (t) {
  let doc = nlp('one two three four.')
  let m = doc.match('two three')
  m.freeze()
  doc.tag('Person')
  t.equal(doc.match('one').has('#Person'), true, 'not-frozen has tag', here)
  t.equal(doc.match('two three').has('#Person'), false, 'frozen has no tag', here)
  t.equal(doc.match('four').has('#Person'), true, 'after has tag', here)
  t.end()
})

test('cant tag frozen term', function (t) {
  let doc = nlp('a shoe in the closet')
  let m = doc.match('shoe').tag('Noun')
  m.freeze() // ☃️
  m.tag('Verb') // ❌ (does nothing)
  t.equal(m.has('#Verb'), false, here)
  m.tag('Singular') // ✅ works
  t.equal(m.has('#Singular'), true, here)

  m.unfreeze() // 🏖️
  m.tag('Verb') // ✅ works
  t.equal(m.has('#Verb'), true, here)
  t.end()
})

test('catch sneeky tags', function (t) {
  let doc = nlp.tokenize('John Ginger is nice')
  doc.match('ginger').tag('Verb').freeze()
  doc.compute('tagger')
  t.equal(doc.has('#Person #Verb is nice'), true, here)
  t.end()
})

test('in plugin', function (t) {
  nlp.plugin({
    frozen: {
      'slug life': 'Verb',
    },
  })
  let doc = nlp(`The cool slug life is nice`)
  t.equal(doc.match('#Verb+').has('slug life'), true, here + 'in plugin')
  t.end()
})

test('block-tag :', function (t) {
  let doc = nlp(`republic of leeland`)
  doc.match('republic of .').tag('Place').freeze()
  doc.match('. of leeland').tag('Organization')
  t.equal(doc.has('#Place{3}'), true, here + 'two-tag')
  t.end()
})

test('freeze-in-sweep :', function (t) {
  let doc = nlp(`republic of leeland`)
  let net = nlp.buildNet([{ match: '. of leeland', tag: 'Organization', freeze: true }])
  doc.sweep(net)
  doc.match('republic of .').tag('Place') //should do nothing
  t.equal(doc.has('#Place'), false, here + 'no-place')
  t.equal(doc.has('#Organization{3}'), true, here + 'has-org')
  t.end()
})

test('freeze-in-prepend :', function (t) {
  nlp.plugin({
    frozen: {
      flq: 'Frozen',
    },
  })
  let doc = nlp('FLQ')
  t.ok(doc.match('flq').has('#Frozen'), 'before-prepend')
  doc.compute('frozen')
  doc.prepend('For the upcoming visit, the patient will need an ')
  t.ok(doc.match('flq').has('#Frozen'), 'after-prepend')
  t.end()
})
