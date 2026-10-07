import test from 'tape'
import nlp from '../../lib/three.js'
import isolateModel from '../../lib/isolate-model.js'
const here = '[three/misc/hash-tags] '

test('case insensitive:', function (t) {
  const doc = nlp('the #leafs and the #JetsGo')
  const m = doc.hashTags()
  t.equal(m.length, 2, here + 'two hashtags')
  t.end()
})

test('case insensitive:', function (t) {
  const doc = nlp('the #leafs and the #JetsGo')
  const m = doc.match('the leafs and')
  t.equal(m.text(), 'the #leafs and', here + 'hashtag normal match')
  t.end()
})

test('hashtag lexicon:', function (t) {
  isolateModel(t, nlp.model().one, ['lexicon', '_multiCache'])
  const str = 'the #leafs and the #JetsGo'
  const doc = nlp(str, { leafs: 'Team' })
  const m = doc.match('the #Team . the #HashTag')
  t.equal(m.text(), 'the #leafs and the #JetsGo', here + 'hashtag lexicon')
  t.end()
})
