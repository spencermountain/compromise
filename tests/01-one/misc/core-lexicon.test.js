import test from 'tape'
import nlp from '../../lib/one.js'
import isolateModel from '../../lib/isolate-model.js'
const here = '[one/misc/core-lexicon] '

test('addWords side-load:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  let lex = {
    bigg: 'Size',
    'bigg apple': 'Town',
  }
  const _nlp = nlp //.fork()
  let doc = _nlp('it was bigg')
  t.equal(doc.has('(#Size|#Town)'), false, here + 'none-on-init')

  doc = _nlp('it was bigg', lex)
  t.equal(doc.has('#Size'), true, here + 'single-word')
  doc = _nlp('the bigg apple', lex)
  t.equal(doc.has('#Town'), true, here + 'found-multi-word')
  t.equal(doc.has('#Size'), false, here + 'no-single-word')

  doc = _nlp('it was bigg')
  t.equal(doc.has('#Size'), true, here + 'lex-persists')

  lex = {
    bigg: undefined,
    'bigg apple': undefined,
  }
  doc = _nlp('it was bigg', lex)
  t.equal(doc.has('#Size'), false, here + 'lex-removed')
  doc = _nlp('the bigg apple', lex)
  t.equal(doc.has('#Town'), false, here + 'multi-lex-removed')

  t.end()
})

test('lexicon compute:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const words = {
    'captain obvious': 'Captain',
  }
  const doc = nlp('it was captain obvious', words)
  const m = doc.match('#Captain+')
  t.equal(m.text(), 'captain obvious', here + 'multi-word')
  t.end()
})

test('tricky lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const lexicon = {
    'bed bath and beyond': 'Organization',
  }
  const _nlp = nlp //.fork()
  let r = _nlp('shopping at Bed Bath and Beyond, the store', lexicon)
  let str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'four-word')

  r = _nlp('shopping at Bed Bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'partially-hyphenated-word')

  r = _nlp('shopping at Bed-bath and-beyond the store', lexicon)
  str = r.match('#Organization+').out('normal')
  t.equal(str, 'bed bath and beyond', here + 'many-hyphenated-word')
  t.end()
})

test('apostrophe lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const lex = {
    "queen anne's lace": 'Flower',
    "applebee's": 'Restaurant',
  }
  let doc = nlp(`i went to applebee's for dinner`, lex)
  t.equal(doc.has(`#Restaurant`), true, here + 'lexicon w/ apostrophe')

  doc = nlp(`Queen Anne's lace`, lex)
  t.equal(doc.has(`#Flower`), true, here + 'multi lexicon w/ apostrophe')
  t.end()
})

test('hashtag lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const lex = {
    '#GoJetsGo': 'SportsTeam',
    '@NHLJets': 'SportsTeam',
  }
  let doc = nlp('#GoJetsGo', lex)
  t.equal(doc.match('#SportsTeam').text(), '#GoJetsGo', here + 'lexicon w/ hashtag')

  doc = nlp('go @NHLJets', lex)
  t.equal(doc.match('#SportsTeam').text(), '@NHLJets', here + 'lexicon w/ at-mention')

  doc = nlp('GoJetsGo', lex)
  t.equal(doc.has('#SportsTeam'), false, here + 'no hashtag, no match')
  t.end()
})

test('long lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  nlp.addWords({ 'new york yankees are cool and not bad': 'Long' })
  let doc = nlp('the new york yankees are cool and smart')
  t.equal(doc.has('#Long'), false, here + 'missed-long')

  doc = nlp('the new york yankees are cool and not bad')
  t.equal(doc.has('#Long'), true, here + 'found-long')

  t.end()
})

test(here + 'lexicon membership does not depend on inherited methods', t => {
  const model = nlp.model().one
  const original = model.lexicon
  t.teardown(() => {
    model.lexicon = original
  })
  for (const lexicon of [{ hasOwnProperty: 'Noun' }, Object.create(null)]) {
    lexicon.zorb = 'Noun'
    model.lexicon = lexicon
    t.equal(nlp('zorb').compute('lexicon').has('#Noun'), true, 'accepts shadowed methods and null prototypes')
  }
  t.end()
})
